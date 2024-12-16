"use client";
import { useGoal } from "@/hooks/goals/use-goal";
import { useParams } from "next/navigation";
import { GoalHeader } from "./components/goal-header";
import { ViewNotesButton } from "./components/view-notes-button";
import { Loading } from "@/components/shared/loading";
import dynamic from "next/dynamic";

const GoalListContent = dynamic(() => import("./components/goal-list-content"));

const GoalPage = () => {
  const { goalId } = useParams();
  const { data: goal, isLoading: goalLoading, error: goalError } = useGoal(Number(goalId));

  if (goalLoading || !goal) return <Loading />;
  if (goalError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="container px-4 py-6 my-10 md:my-0">
      <div className="rounded-2xl w-full mx-auto h-full lg:mx-16">
        <h1 className="text-lg font-semibold mb-4">목표</h1>
        <GoalHeader goal={goal} progress={goal.progress} />
        <ViewNotesButton />
        <GoalListContent />
      </div>
    </div>
  );
};

export default GoalPage;
