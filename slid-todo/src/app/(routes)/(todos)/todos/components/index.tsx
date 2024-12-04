"use client";

import { useState } from "react";
import { useTodosInfinite } from "@/hooks/todo/use-todos";
import TodoHeader from "./todo-header";
import TodoFilter from "./todo-filter";
import { TodoListContent } from "./todo-list-content";
import { TabType } from "./utils";
import { Todo } from "@/types/todo";
import { Loading } from "@/components/shared/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
interface TodoPage {
  todos: Todo[];
  totalCount: number;
}

interface TodoData {
  pages: TodoPage[];
  pageParams: any[];
}

const TodoList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { data, isLoading } = useTodosInfinite();

  if (isLoading) return <Loading />;

  const todoData = data as TodoData;

  return (
    <>
      <div className="pt-4">
        <TodoHeader totalCount={todoData?.pages[0].totalCount || 0} />
      </div>
      <div className="h-[calc(100vh-120px)] flex flex-col bg-white rounded-2xl dark:bg-gray-900">
        <div className="px-4 pt-4">
          <TodoFilter activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <ScrollArea className="flex-1 pb-8">
          <div className="px-4 dark:bg-gray-900 w-full ">
            <TodoListContent data={todoData} activeTab={activeTab} />
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default TodoList;
