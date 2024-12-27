// 목표별 할일 블럭
import { Goal } from "@/public/svgs"; // 임시로 아이콘 사용
import GoalToDoContainer from "./goal-todo-container";

const GoalToDo = () => {
  return (
    <div className="bg-card text-card-foreground w-full rounded-2xl flex flex-col p-4 transition-colors">
      <div className="flex gap-2 px-4 py-2 items-center">
        <Goal className="w-10 h-10 rounded-xl" />
        <h2 className="text-lg font-semibold text-foreground">목표 별 할 일</h2>
      </div>
      <div className="w-full rounded-lg flex flex-col overflow-hidden">
        <GoalToDoContainer />
      </div>
    </div>
  );
};

export default GoalToDo;
