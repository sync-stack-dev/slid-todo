// 대시보드 : 최신 할 일 영역 아이콘
import { cn } from "@/utils/cn"; 

interface TodoRecentlyProps {
  className?: string;  
}

export const TodoRecently = ({ className }: TodoRecentlyProps) => (
  <svg
    className={cn("w-6 h-6", className)} 
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="15" fill="#3B82F6" />
    <rect x="12" y="14.667" width="13.3333" height="13.3333" rx="3.55556" fill="#BFDBFE" />
    <rect x="14.667" y="12" width="13.3333" height="13.3333" rx="3.55556" fill="white" />
  </svg>
);

export default TodoRecently;
