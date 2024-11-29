import RecentToDo from "./components/recent-todo-block/recent-todo";
import GoalToDo from "./components/goal-todo-block/goal-todo";
import MyProgress from "./components/progress-block/board-progress";

const DashBoard = () => {
    return(
       <div className="bg-[#F1F5F9] w-full flex justify-center">
            <div className="w-[90%]  flex flex-col gap-4 p-2">
                <h2 className="text-[18px]">대시보드</h2>
                <div className="w-full flex gap-4">
                    <RecentToDo />
                    <MyProgress />
                </div>
                <GoalToDo />
            </div>
       </div> 
    );
};

export default DashBoard;