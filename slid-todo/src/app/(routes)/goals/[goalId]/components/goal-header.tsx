import React from "react";
import { Goal as GoalSvg } from "@/public/svgs";
import { Goal } from "@/types/goal";
import { Progress } from "@/components/ui/progress";

const GoalHeader = ({ goal, progress }: { goal: Goal; progress: number }) => {
  return (
    <div className="flex flex-col gap-2 max-w-[1200px] max-h-[136px] bg-white rounded-lg px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GoalSvg className="w-10 h-10" />
          <h1 className="text-lg font-semibold">{goal.title}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-sm font-semibold">Progress</p>
        <div className="w-full flex h-2 items-center gap-4">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm font-semibold">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default GoalHeader;
