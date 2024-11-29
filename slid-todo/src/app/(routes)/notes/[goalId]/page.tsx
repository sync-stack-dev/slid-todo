"use client";
import { useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useGoal } from "@/hooks/goals/use-goal";
import NoteGoalTitle from "./components/note-goal-title";
import NoteList from "./components/note-list";

const NotePage = () => {
  const { goalId } = useParams();
  const { data: goal, isLoading: goalLoading, error: goalError } = useGoal(Number(goalId));

  if (goalLoading) return <Loading />;
  if (goalError) return <div>에러가 발생했습니다.</div>;
  if (!goal) return <div>목표를 찾을 수 없습니다.</div>;

  return (
    <>
      <div className="h-screen bg-[#F1F5F9] px-36 py-10">
        <div className="flex flex-col w-1/2 h-full">
          <div className="text-lg text-slate-900 mb-5">노트 모아보기</div>
          <NoteGoalTitle goalTitle={goal.title} />
          <NoteList goalId={goal.id} />
        </div>
      </div>
    </>
  );
};

export default NotePage;
