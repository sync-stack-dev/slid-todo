import { instance } from "@/lib/axios";
import { Note, NotesResponse } from "@/types/note";
import { useQuery } from "@tanstack/react-query";
import { useTodosOnce } from "../todo/use-todos";

export const useNoteById = (noteId: number) => {
  return useQuery<Note>({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      const response = await instance.get<Note>(`/notes/${noteId}`);
      return response.data;
    },
  });
};

export const useNoteWithTodo = (noteId: number) => {
  const {
    data: note,
    isLoading: isLoadingNote,
    isError: isErrorNote,
  } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: () => instance.get<Note>(`/notes/${noteId}`).then((res) => res.data),
  });

  // note 객체 안에 있는 todo 정보를 사용
  const todo = note
    ? {
        ...note.todo,
        goal: note.goal,
        userId: note.userId,
        teamId: note.teamId,
        updatedAt: note.updatedAt,
        createdAt: note.createdAt,
      }
    : null;

  return {
    note,
    todo,
    isLoading: isLoadingNote,
    isError: isErrorNote,
  };
};

export const useNoteList = (goalId: number) => {
  return useQuery<NotesResponse>({
    queryKey: ["notes", "list", goalId],
    queryFn: async () => {
      const size = 40;
      const response = await instance.get<NotesResponse>("/notes", {
        params: {
          goalId,
          size,
        },
      });
      return response.data;
    },
  });
};
