import { Flag } from "lucide-react";
import { useState } from "react";

const AppSidebarGoal = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "자바스크립트로 웹 서비스 만들기",
    },
    {
      id: 2,
      name: "디자인 시스템 강의 듣기",
    },
  ]);

  // TODO : 목표 리스트 API -> by userInfo

  return (
    <div className="px-5 py-2">
      <div className="flex items-center pb-5">
        <Flag className="w-[24px] h-[24px] mr-2" />
        <div>목표</div>
      </div>

      <div className="text-sm text-slate-700">
        {goals.map((goal: any) => (
          <div key={goal.id} className="p-1">
            · {goal.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSidebarGoal;
