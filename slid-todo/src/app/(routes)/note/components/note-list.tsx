"use client";
import { useState } from "react";
import { Note } from "@/types/note";
import NoteCardAction from "./note-card-action";

const NoteList = () => {
  // TODO : 목표 리스트 API 로 받아와서 GoalNoteCard 전달
  const [noteList, setNoteList] = useState([
    {
      todo: {
        done: true,
        title: "자바스크립트 기초 챕터1 듣기",
        id: 0,
      },
      updatedAt: "2024-11-22T00:00:29.732Z",
      createdAt: "2024-11-22T00:00:29.732Z",
      title: "자바스크립트를 배우기 전 알아두어야 할 것",
      id: 0,
      goal: {
        title: "자바스크립트로 웹 서비스 만들기",
        id: 1,
      },
      userId: 0,
      teamId: "이건 어디에 쓰지",
      content: "test",
    },
    {
      todo: {
        done: true,
        title: "자바스크립트 기초 챕터2 듣기",
        id: 0,
      },
      updatedAt: "2024-11-22T00:00:29.732Z",
      createdAt: "2024-11-22T00:00:29.732Z",
      title: "자바스크립트를 시작하기 전 준비물",
      id: 1,
      goal: {
        title: "자바스크립트로 웹 서비스 만들기",
        id: 1,
      },
      userId: 0,
      teamId: "이건 어디에 쓰지",
      content: "test",
    },
  ]);

  return (
    <div className="grid gap-2.5 grid-cols-1 ">
      {noteList.map((note: Note) => (
        <NoteCardAction key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
