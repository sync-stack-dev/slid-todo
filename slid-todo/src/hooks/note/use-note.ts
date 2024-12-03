import { instance } from "@/lib/axios";
import { Note, NotesResponse } from "@/types/note";
import { Todo } from "@/types/todo";
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

  const { data, isLoading: isLoadingTodo, isError: isErrorTodo } = useTodosOnce();
  const todo = data?.todos?.find((item) => item.noteId === noteId);

  const isLoading = isLoadingNote || isLoadingTodo;
  const isError = isErrorNote || isErrorTodo;

  return { note, todo, isLoading, isError };
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
