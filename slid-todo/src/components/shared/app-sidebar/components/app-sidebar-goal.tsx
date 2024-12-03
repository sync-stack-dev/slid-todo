// components/shared/app-sidebar/components/app-sidebar-goal.tsx
"use client";
import { useGoals } from "@/hooks/goals/use-goals";
import { Flag } from "lucide-react";
import { Goal } from "@/types/goal";
import Link from "next/link";
import Skeleton from "@/components/shared/skeleton";

const AppSidebarGoal = () => {
  const { data, isLoading } = useGoals();

  if (isLoading) {
    return (
      <div className="px-5 py-2">
        <div className="flex items-center pb-5">
          <Skeleton className="w-[16px] h-[16px] mr-3 rounded-full" />
          <Skeleton className="h-[22px] w-24 rounded-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4 rounded-xl" />
          <Skeleton className="h-4 w-2/3 rounded-xl" />
          <Skeleton className="h-4 w-1/2 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>목표 없음</div>;
  }

  return (
    <div className="px-5 py-2">
      <div className="flex items-center pb-5">
        <Flag className="w-[16px] h-[16px] mr-3" />
        <span className="text-lg font-medium">목표</span>
      </div>

      <div className="text-sm text-slate-700 dark:text-slate-300 flex flex-col gap-1">
        {data.goals.map((goal: Goal) => (
          <Link
            href={`/goals/${goal.id}`}
            key={goal.id}
            data-cy="sidebar-goal-select-item"
            className="block p-1 hover:bg-slate-200 dark:hover:bg-slate-700 hover:cursor-pointer rounded-lg"
          >
            · {goal.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppSidebarGoal;
