"use client";

import { getTodos } from "@/actions/todo/todos";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import TodoHeader from "./todo-header";
import TodoFilter from "./todo-filter";
import TodoItem from "./todo-item";
import { TabType, getFilteredTodos } from "./utils";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const TodoList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({ pageParam = 0 }) => getTodos(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;

  // 모든 페이지의 todos를 하나의 배열로 합치기
  const allTodos = data?.pages.flatMap((page) => page.todos) || [];
  console.log("전체 데이터:", allTodos);

  const displayTodos = getFilteredTodos(allTodos, activeTab);

  return (
    <div className="flex flex-col p-8 space-y-2">
      <TodoHeader totalCount={data?.pages[0].totalCount || 0} />
      <TodoFilter activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-auto h-[500px]">
        <div className="space-y-1">
          {displayTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          <div ref={ref} className="h-10">
            {isFetchingNextPage && "Loading more..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
