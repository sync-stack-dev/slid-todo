// 목표별 할일 블럭
import { Goal } from "../../../../../../public/svgs"; // 임시로 아이콘 사용


const GoalToDo = () => {
    return(
        <div className="bg-white w-full h-[calc(100vh-120px)] rounded-2xl flex flex-col p-4">
           <div className="flex gap-2">
             <Goal/> 
             <h2>목표 별 할 일</h2>
           </div> 
        </div>      
    );
};

export default GoalToDo;