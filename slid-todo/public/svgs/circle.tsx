// 대시보드 : 진행 프로그레스 원형svg
import { cn } from "@/utils/cn";

interface CircleProps {
  className?: string;
  progress: number; // 진행률을 나타내는 값 (0~100)
}

const Circle = ({ className, progress }: CircleProps) => {
  const radius = 67;
  const circumference = 2 * Math.PI * radius;

  // 진행률에 따른 stroke-dashoffset 계산
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <svg
      className={cn(className)}
      viewBox="0 0 166 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 배경 원 */}
      <circle cx="83" cy="83" r={radius} stroke="#F8FAFC" strokeWidth="32" fill="none" />
      {/* 진행 상태 원 */}
      <circle
        cx="83"
        cy="83"
        r={radius}
        stroke="#333333" // 원하는 색상
        strokeWidth="32"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        // strokeLinecap="round" 프로그레스 edge 동그랗게
        transform="rotate(-90 83 83)" // 12시 기준으로 시작
        className="transition-all duration-1000 ease-in-out"
      />
    </svg>
  );
};

export default Circle;
