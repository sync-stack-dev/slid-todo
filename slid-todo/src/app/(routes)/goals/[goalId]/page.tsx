"use client";
import { useGoal } from "@/hooks/goals/use-goal";
import { useGoalTodos } from "@/hooks/goals/use-goal-todos";
import { useParams } from "next/navigation";
import GoalHeader from "./components/goal-header";
import ViewNotesButton from "./components/view-notes-button";
import { GoalTodoList } from "./components/goal-todo-list";

const GoalPage = () => {
  const { goalId } = useParams();
  const { data: goal, isLoading: goalLoading, error: goalError } = useGoal(Number(goalId));
  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useGoalTodos({
    goalId: Number(goalId),
    size: 20,
  });

  if (goalLoading || todosLoading) return <div>로딩중...</div>;
  if (goalError || todosError) return <div>에러가 발생했습니다.</div>;
  if (!goal) return <div>목표를 찾을 수 없습니다.</div>;

  return (
    <div className="pl-16 pt-4 bg-[#F1F5F9] w-screen h-screen">
      <h1 className="text-lg font-semibold mb-4">목표</h1>
      <GoalHeader goal={goal} progress={goal.progress} />
      <ViewNotesButton />
      <GoalTodoList todos={todos?.todos} />
    </div>
  );
};

export default GoalPage;
