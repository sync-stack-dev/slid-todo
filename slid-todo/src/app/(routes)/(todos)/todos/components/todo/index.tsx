"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useTodosInfinite } from "@/hooks/use-todos";
import TodoHeader from "./todo-header";
import TodoFilter from "./todo-filter";
import TodoItem from "./todo-item";
import { TabType, getFilteredTodos } from "./utils";

const TodoList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useTodosInfinite();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;

  const allTodos = data?.pages.flatMap((page) => page.todos) || [];
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
