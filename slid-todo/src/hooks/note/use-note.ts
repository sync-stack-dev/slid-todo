import { instance } from "@/lib/axios";
import { Note, NotesResponse } from "@/types/note";
import { useQuery } from "@tanstack/react-query";

export const useNoteById = (noteId: number) => {
  return useQuery<Note>({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      const response = await instance.get<Note>(`/notes/${noteId}`);
      return response.data;
    },
  });
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
