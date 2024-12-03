"use client";
import { useGoals } from "@/hooks/goals/use-goals";
import { Flag } from "lucide-react";
import { Goal } from "@/types/goal";
import { useGoalStore } from "@/stores/use-goal-store";
import Link from "next/link";

const AppSidebarGoal = () => {
  const { data } = useGoals();
  // const setCurGoal = useGoalStore((state) => state.setCurGoal);

  if (!data)
    return (
      <>
        <div>목표 없음</div>
      </>
    );

  return (
    <div className="px-5 py-2">
      <div className="flex items-center pb-5">
        <Flag className="w-[16px] h-[16px] mr-3" />
        <span className="text-lg font-medium">목표</span>
      </div>

      <div className="text-sm text-slate-700 flex flex-col gap-1">
        {data.goals.map((goal: Goal) => (
          <Link
            href={`/goals/${goal.id}`}
            key={goal.id}
            data-cy="sidebar-goal-select-item"
            className="block p-1 hover:bg-slate-200 hover:cursor-pointer rounded-lg"
          >
            · {goal.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppSidebarGoal;
