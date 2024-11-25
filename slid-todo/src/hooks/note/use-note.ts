import { instance } from "@/lib/axios";
import { NotesResponse } from "@/types/note";
import { useQuery } from "@tanstack/react-query";

export const useNoteList = (goalId: number) => {
  return useQuery<NotesResponse>({
    queryKey: ["notes", "list"],
    queryFn: async () => {
      const size = 40;
      const response = await instance.get<NotesResponse>("/notes", {
        params: {
          goalId,
          size,
          cursor: 0,
        },
      });
      return response.data;
    },
  });
};
