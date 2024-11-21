import React from "react";
import { Goal as GoalSvg } from "../../../../../../public/svgs";
import { Goal } from "@/actions/goal/types";
import { Progress } from "@/components/ui/progress";
import { MoreMenu } from "./more-menu";
const GoalHeader = ({ goal, progress }: { goal: Goal; progress: number }) => {
  return (
    <div className="flex flex-col gap-2 max-w-[1200px] max-h-[136px] bg-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GoalSvg className="w-10 h-10" />
          <h1 className="text-lg font-semibold">{goal.title}</h1>
        </div>
        <MoreMenu goal={goal} />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-sm font-semibold">Progress</p>
        <Progress value={progress} className="w-full h-2" /> {/* h-4 h-2 중복 제거 */}
      </div>
    </div>
  );
};

export default GoalHeader;
