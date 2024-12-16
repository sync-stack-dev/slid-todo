"use client";
import { useParams } from "next/navigation";
import { useGoal } from "@/hooks/goals/use-goal";
import NoteGoalTitle from "./components/note-goal-title";
import dynamic from "next/dynamic";
const NoteListContent = dynamic(() => import("./components/note-list"), {
  ssr: false,
});
const NotePage = () => {
  const { goalId } = useParams();
  const { data: goal, error: goalError } = useGoal(Number(goalId));

  if (!goal) return null;
  if (goalError) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <div className="flex flex-col px-4 py-6 my-10 md:my-0">
        <div className="flex-1">
          <div className="pt-4 rounded-2xl w-full max-w-[800px] mx-auto h-full lg:mx-16">
            <h1 className="text-lg text-slate-900 mb-5 dark:text-white">노트 모아보기</h1>
            <NoteGoalTitle goalTitle={goal.title} />
            <NoteListContent goalId={goal.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotePage;
