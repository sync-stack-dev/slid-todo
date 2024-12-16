import { instance } from "@/lib/axios";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface CreateNoteRequest {
  todoId: number;
  title: string;
  content: string;
  linkUrl?: string | null;
}

interface UpdateNoteRequest {
  title?: string;
  content?: string;
  linkUrl?: string;
}

export const useNoteActions = (note?: Note) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createNote } = useMutation({
    mutationFn: async (newNote: CreateNoteRequest) => {
      const requestData = {
        ...(newNote.todoId && { todoId: newNote.todoId }),
        ...(newNote.title && { title: newNote.title }),
        ...(newNote.content && { content: newNote.content }),
        ...(newNote.linkUrl && { linkUrl: newNote.linkUrl }),
      };

      const response = await instance.post("/notes", requestData);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("노트가 작성되었습니다.");
      router.back();
    },
    onError: (error, CreateNoteRequest) => {
      // console.error("API Error:", error);
      if (!CreateNoteRequest.title) toast.error("노트 제목을 작성해야합니다.");
      else if (!CreateNoteRequest.content) toast.error("노트 내용을 작성해야합니다.");
      else toast.error("노트 작성에 실패했습니다.");
    },
  });

  const { mutate: updateNote } = useMutation({
    mutationFn: async ({ updatedNote }: { noteId: number; updatedNote: UpdateNoteRequest }) => {
      const requestData = {
        title: updatedNote.title ?? null,
        content: updatedNote.content ?? null,
        linkUrl: updatedNote.linkUrl ? updatedNote.linkUrl : null,
      };

      const response = await instance.patch(`/notes/${note?.id}`, requestData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("노트가 수정되었습니다.");
      router.back();
    },
    onError: (error, UpdateNoteRequest) => {
      console.error("API Error:", error);
      if (!UpdateNoteRequest.updatedNote.title) toast.error("노트 제목을 작성해야합니다.");
      else if (!UpdateNoteRequest.updatedNote.content) toast.error("노트 내용을 작성해야합니다.");
      else toast.error("노트 수정에 실패했습니다.");
    },
  });

  const { mutate: deleteNote } = useMutation({
    mutationFn: async () => {
      if (!note) {
        throw new Error("note 인스턴스가 존재하지 않습니다.");
      }
      await instance.delete(`/notes/${note.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("note가 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("API Error:", error);
      toast.error("note 삭제에 실패했습니다.");
    },
  });

  return {
    createNote,
    deleteNote,
    updateNote,
  };
};
