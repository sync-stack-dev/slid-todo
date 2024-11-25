"use client";
import { Flag } from "lucide-react";
import { useState } from "react";
import { Goal } from "../../../../../public/svgs";

const NoteGoalTitle = () => {
  const [goal, setGoal] = useState("자바스크립트로 웹 서비스 만들기");
  // TODO : Selected Goal 가져오기
  // TODO : 가져온 Goal 기반 API 호출부 -> 노트 목록

  return (
    <div className="w-1/2 bg-white flex items-center p-5 border-[1px] border-slate-100 rounded-xl mb-5">
      <Goal className="mr-3" />
      <div className="text-sm text-slate-800">{goal}</div>
    </div>
  );
};

export default NoteGoalTitle;
