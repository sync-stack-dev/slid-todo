import { Todo } from "@/types/todo";
import { Note } from "@/types/note";
import { Goal } from "@/types/goal";
export const todoWithAllProps: Todo = {
  id: 1,
  title: "Sample Todo",
  done: false,
  goal: {
    id: 1,
    title: "Sample Goal",
  },
  linkUrl: "https://example.com",
  fileUrl: "https://example.com/file",
  noteId: 123,
  userId: 1,
  teamId: "team1",
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  description: "This is a sample todo",
};

export const todoWithNoProps: Todo = {
  id: 2,
  title: "Empty Todo",
  done: false,
  goal: {
    id: 2,
    title: "Empty Goal",
  },
  linkUrl: "",
  fileUrl: "",
  noteId: 0,
  userId: 2,
  teamId: "team2",
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

export const noteData: Note = {
  id: 1,
  title: "테스트 노트 제목",
  content: "테스트 노트 내용입니다.\n여러 줄 작성 테스트",
  linkUrl: "https://example.com",
  updatedAt: "2024-03-19T12:00:00Z",
  createdAt: "2024-03-19T12:00:00Z",
  userId: 1,
  teamId: "team1",
  fileUrl: "https://example.com/file",
  goal: {
    id: 1,
    title: "테스트 목표",
  },
  todo: todoWithAllProps,
};
