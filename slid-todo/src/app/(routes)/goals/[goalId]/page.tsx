"use client";
import { useGoal } from "@/hooks/goals/use-goal";
import { useGoalTodos } from "@/hooks/goals/use-goal-todos";
import { useParams } from "next/navigation";
import GoalHeader from "./components/goal-header";
import ViewNotesButton from "./components/view-notes-button";
import { GoalListContent } from "./components/goal-list-content";
import Loading from "@/components/shared/loading";

const GoalPage = () => {
  const { goalId } = useParams();
  const { data: goal, isLoading: goalLoading, error: goalError } = useGoal(Number(goalId));

  if (goalLoading) return <Loading />;
  if (goalError) return <div>에러가 발생했습니다.</div>;
  if (!goal) return <div>목표를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-6 bg-[#F1F5F9]">
      <h1 className="text-lg font-semibold mb-4">목표</h1>
      <GoalHeader goal={goal} progress={goal.progress} />
      <ViewNotesButton />
      <GoalListContent />
    </div>
  );
};

export default GoalPage;
