import React from "react";
import TodoList from "./components";

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
