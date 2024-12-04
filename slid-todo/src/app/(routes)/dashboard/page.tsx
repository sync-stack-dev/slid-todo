"use client";
import RecentToDo from "./components/recent-todo-block/recent-todo";
import GoalToDo from "./components/goal-todo-block/goal-todo";
import MyProgress from "./components/progress-block/board-progress";
import { Loading } from "@/components/shared/loading";
import { useRecentTodos } from "@/hooks/todo/use-todos";
import { useProgress } from "@/hooks/goals/use-dashboard-goals";
import { useGoalListInfinite } from "@/hooks/goals/use-dashboard-goals";

const DashBoard = () => {
  const { isLoading: isRecentLoading } = useRecentTodos();
  const { isLoading: isProgressLoading } = useProgress();
  const { isLoading: isGoalLoading } = useGoalListInfinite();

  const isLoading = isRecentLoading || isProgressLoading || isGoalLoading;

  if (isLoading) {
    return <Loading fullScreen={false} size={150} />;
  }

  return (
    <div className="container px-4 py-6">
      <div className="rounded-2xl w-full mx-auto h-full lg:mx-16 flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-4">대시보드</h2>
        <div className="w-full flex gap-4 flex-col md:flex-row">
          <div className="flex-1 border dark:border-gray-800 rounded-2xl">
            <RecentToDo />
          </div>
          <div className="flex-1">
            <MyProgress />
          </div>
        </div>
        <GoalToDo />
      </div>
    </div>
  );
};

export default DashBoard;
