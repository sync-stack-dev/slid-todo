import { useGoals } from "@/hooks/goals/use-goals";
import { Flag } from "lucide-react";
import { Loading } from "../../loading";
import { Goal } from "@/types/goal";

const AppSidebarGoal = () => {
  const { data, isLoading } = useGoals();

  if (isLoading) return <Loading />;

  if (!data)
    return (
      <>
        <div>목표 없음</div>
      </>
    );

  return (
    <div className="px-5 py-2">
      <div className="flex items-center pb-5">
        <Flag className="w-[24px] h-[24px] mr-2" />
        <div>목표</div>
      </div>

      <div className="text-sm text-slate-700">
        {data.goals.map((goal: Goal) => (
          <div key={goal.id} className="p-1">
            · {goal.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSidebarGoal;
