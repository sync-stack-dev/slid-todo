import { instance } from "@/lib/axios";
import { NotesResponse } from "./types";

export const getNotes = async (cursor: number): Promise<NotesResponse> => {
  const response = await instance.get<NotesResponse>(`/notes?cursor=${cursor}`);
  return response.data;
};
