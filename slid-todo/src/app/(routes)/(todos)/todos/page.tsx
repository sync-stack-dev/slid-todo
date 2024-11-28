import React from "react";
import dynamic from "next/dynamic";

const TodoList = dynamic(() => import("./components"), { ssr: false });

const TodosPage = () => {
  return (
    <div className="flex bg-[#F1F5F9] h-full">
      <div className="flex-1">
        <div className="rounded-2xl w-full max-w-[800px] mx-auto h-full lg:mx-16">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
