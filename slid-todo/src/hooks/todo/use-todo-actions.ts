import { Todo } from "@/actions/todo/types";
import { instance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CreateTodoRequest {
  title: string;
  fileUrl?: string;
  linkUrl?: string;
  goalId?: number;
}
interface UpdateTodoRequest {
  title: string;
  fileUrl?: string;
  linkUrl?: string;
  goalId?: number;
  done?: boolean;
}

export const useTodoActions = (todo?: Todo) => {
  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation({
    mutationFn: async (newTodo: CreateTodoRequest) => {
      const requestData = {
        title: newTodo.title,
        ...(newTodo.fileUrl && { fileUrl: newTodo.fileUrl }),
        ...(newTodo.linkUrl && { linkUrl: newTodo.linkUrl }),
        ...(newTodo.goalId && { goalId: newTodo.goalId }),
      };

      const response = await instance.post("/todos", requestData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("할 일이 추가되었습니다.");
    },
    onError: (error) => {
      console.error("API Error:", error);
      toast.error("추가에 실패했습니다.");
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async () => {
      if (!todo?.id) return;
      await instance.delete(`/todos/${todo.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("할 일이 삭제되었습니다.");
    },
    onError: () => {
      toast.error("삭제에 실패했습니다.");
    },
  });

  const { mutate: updateTodo } = useMutation({
    mutationFn: async (updatedTodo: UpdateTodoRequest) => {
      if (!todo?.id) return;

      console.log("Received in mutation:", updatedTodo);

      const requestData = {
        title: updatedTodo.title,
        done: updatedTodo.done,
        fileUrl: updatedTodo.fileUrl || null,
        linkUrl: updatedTodo.linkUrl || null,
        goalId: updatedTodo.goalId || null,
      };

      const cleanedData = Object.fromEntries(
        Object.entries(requestData).filter(([_, value]) => value !== undefined),
      );

      console.log("Final request data:", cleanedData);
      await instance.patch(`/todos/${todo.id}`, cleanedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("할 일이 수정되었습니다.");
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("수정에 실패했습니다.");
    },
  });

  const { mutate: updateTodoDone } = useMutation({
    mutationFn: async (done: boolean) => {
      if (!todo?.id) return;
      await instance.patch(`/todos/${todo.id}`, { done });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"], // todos로 시작하는 모든 쿼리 무효화
      });

      toast.success("할 일 상태가 업데이트되었습니다.");
    },
    onError: () => {
      toast.error("상태 업데이트에 실패했습니다.");
    },
  });

  return {
    createTodo,
    deleteTodo,
    updateTodo,
    updateTodoDone,
  };
};
