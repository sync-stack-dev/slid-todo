// 최근 할일 헤더
"use client";
import TodoRecently from "../../../../../../public/svgs/todo-recently"; // 최근할일 아이콘
import Link from "next/link";

const RecentToDoHeader = () => {
    return(
        <div className="w-full flex justify-between">
            <div className="flex gap-2">
            <TodoRecently />
            <h1 className="text-sm">최근 등록한 할일</h1>
            </div>
            <Link href="/todos" className="text-sm">모두 보기</Link>
        </div>
    );
};

export default RecentToDoHeader;