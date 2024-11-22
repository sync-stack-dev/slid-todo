import React from "react";
import TodoList from "./components/todo";
// import { AppSidebar } from "./components/sidebar";
const TodosPage = () => {
  return (
    <div className="flex h-screen w-screen bg-[#F1F5F9]">
      {/* <AppSidebar /> */}
      <div className="flex-1 h-full p-4">
        <div className="h-full w-full bg-white rounded-2xl max-w-[800px] max-h-[988px] overflow-y-auto">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
