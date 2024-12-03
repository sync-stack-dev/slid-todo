"use client";
import RecentToDoHeader from "./recent-header";
import RecentContainer from "./recent-container";

const RecentToDo = () => {
  return (
    <div className="bg-white dark:bg-black w-full h-[250px] rounded-2xl flex flex-col gap-[8px] p-4 transition-colors">
      <RecentToDoHeader />
      <RecentContainer />
    </div>
  );
};

export default RecentToDo;
