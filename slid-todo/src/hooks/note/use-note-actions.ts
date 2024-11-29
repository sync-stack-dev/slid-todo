import { instance } from "@/lib/axios";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useNoteActions = (note?: Note) => {
  const queryClient = useQueryClient();

  //   const { mutate: createTodo } = useMutation({
  //     mutationFn: async (newTodo: CreateTodoRequest) => {
  //       const requestData = {
  //         title: newTodo.title,
  //         ...(newTodo.fileUrl && { fileUrl: newTodo.fileUrl }),
  //         ...(newTodo.linkUrl && { linkUrl: newTodo.linkUrl }),
  //         ...(newTodo.goalId && { goalId: newTodo.goalId }),
  //       };

  //       const response = await instance.post("/todos", requestData);
  //       return response.data;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["notes"] });
  //       toast.success("할 일이 추가되었습니다.");
  //     },
  //     onError: (error) => {
  //       console.error("API Error:", error);
  //       toast.error("추가에 실패했습니다.");
  //     },
  //   });

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
    deleteNote,
  };
};
