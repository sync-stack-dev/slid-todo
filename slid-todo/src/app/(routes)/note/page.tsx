"use client";

import NoteList from "./components/note-list";
import NoteGoalTitle from "./components/note-goal-title";
import { useGoalStore } from "@/stores/use-goal-store";

const NotePage = () => {
  const curGoal = useGoalStore((state) => state.curGoal);

  return (
    <>
      <div className="w-screen h-screen bg-[#F1F5F9] px-36 py-10">
        <div className="text-lg text-slate-900 mb-5">노트 모아보기</div>
        {curGoal ? (
          <>
            <NoteGoalTitle goalTitle={curGoal.title} />
            <NoteList goalId={curGoal.id} />
          </>
        ) : (
          <div>빈화면</div>
        )}
      </div>
    </>
  );
};

export default NotePage;
