import { Goal } from "@/public/svgs";
import { Goal as GoalType } from "@/types/goal";

export const GoalHeader = ({ goal }: { goal: GoalType }) => {
  return (
    <div className="flex items-center gap-2">
      <Goal className="w-10 h-10" />
    </div>
  );
};
