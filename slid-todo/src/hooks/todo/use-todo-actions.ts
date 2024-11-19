import { Todo } from "@/actions/todo/types";
import { instance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useTodoActions = (todo: Todo) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async () => {
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

  return {
    deleteTodo,
  };
};
