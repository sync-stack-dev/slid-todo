// 최근 할일 컨테이너
"use client"
import RecentToDoHeader from "./recent-header";
import RecentContainer from "./recent-container";

const RecentToDo = () => {
    return(
        <div className="bg-white w-[50%] h-[250px] rounded-2xl flex flex-col gap-[8px] p-4">
            <RecentToDoHeader />
            <RecentContainer />
        </div>
    );
};

export default RecentToDo;