"use client";
import Circle from "@/public/svgs/circle";
interface CircleProgressProps {
  data: number; // data 타입 정의
}
const CircleProgress = ({ data }: CircleProgressProps) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <Circle progress={data} className="w-40 h-40" />
    </div>
  );
};

export default CircleProgress;
