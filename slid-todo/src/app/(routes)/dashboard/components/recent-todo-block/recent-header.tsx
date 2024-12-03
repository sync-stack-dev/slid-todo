// 최근 할일 헤더
"use client";
import TodoRecently from "@/public/svgs/todo-recently"; // 최근할일 아이콘
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const RecentToDoHeader = () => {
  return (
    <div className="w-full flex justify-between px-2">
      <div className="flex gap-2 items-center py-2">
        <TodoRecently className="w-10 h-10" />
        <h1 className="text-lg font-semibold">최근 등록한 할 일</h1>
      </div>
      <Link
        href="/todos"
        className="text-sm text-slate-600 flex items-center gap-1 hover:text-slate-900"
      >
        모두 보기
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default RecentToDoHeader;
