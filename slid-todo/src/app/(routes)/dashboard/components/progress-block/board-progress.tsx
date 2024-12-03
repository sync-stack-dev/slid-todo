"use client"; 
import Ellipse from "../../../../../../public/svgs/ellipse";
import Progress from "../../../../../../public/svgs/progress";
import CircleProgress from "./circleProgress";
import { useProgress } from "@/hooks/goals/use-dashboard-goals";

const MyProgress = () => {
    const { data, isLoading, error } = useProgress();
    if (isLoading) return <div>로딩 중...</div>;

    return(
        <div className="bg-[#3B82F6] w-full h-[250px] rounded-2xl flex-1  relative">
            <Ellipse className="absolute left-[30%] bottom-0 w-[80%] h-[80%]" />

            <div className="relative z-10 p-4 pl-4">
            <Progress />
            <div className="w-full flex justify-between ">
                <div className="w-[50%] flex flex-col gap-2">
                    <span className="text-white mt-8">내 진행 상황</span>
                    <h1 className="text-white text-4xl">{data ? `${data}%` : '데이터 없음'}</h1>
                </div>
                <div className=" flex-1 items-center">
                    <CircleProgress  data={data}/>
                </div>
            </div>
        </div>
        </div>
    );
};

export default MyProgress;