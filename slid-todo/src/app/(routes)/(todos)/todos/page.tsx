"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Loading } from "@/components/shared/loading";
import { useTodosInfinite } from "@/hooks/todo/use-todos";
const TodoList = dynamic(() => import("./components"), { ssr: false });

const TodosPage = () => {
  const { isLoading } = useTodosInfinite();
  if (isLoading) return <Loading fullScreen={false} size="md" />;
  return (
    <div className="flex px-4 my-10 md:my-0" data-testid="todos-page">
      <div className="flex-1">
        <div className="rounded-2xl w-full max-w-[800px] mx-auto h-full lg:mx-16">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
