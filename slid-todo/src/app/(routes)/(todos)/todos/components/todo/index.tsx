"use client";

import { useState } from "react";
import { useTodosInfinite } from "@/hooks/use-todos";
import TodoHeader from "./todo-header";
import TodoFilter from "./todo-filter";
import { TodoListContent } from "./todo-list-content";
import { TabType } from "./utils";
import { Todo } from "@/actions/todo/types";

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

  if (isLoading) return <div>Loading...</div>;

  const todoData = data as TodoData;

  return (
    <div className="flex flex-col p-8 space-y-2 h-full">
      <TodoHeader totalCount={todoData?.pages[0].totalCount || 0} />
      <TodoFilter activeTab={activeTab} onTabChange={setActiveTab} />
      <TodoListContent data={todoData!} activeTab={activeTab} />
    </div>
  );
};

export default TodoList;
