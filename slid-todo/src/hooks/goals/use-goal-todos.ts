import { useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";

interface Todo {
  id: number;
  title: string;
  done: boolean;
  noteId?: number;
  linkUrl?: string;
  fileUrl?: string;
  goal?: {
    id: number;
    title: string;
  };
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

interface TodosResponse {
  totalCount: number;
  nextCursor: number;
  todos: Todo[];
}

interface UseGoalTodosParams {
  goalId: number;
  done?: boolean;
  cursor?: number;
  size?: number;
}

export const useGoalTodos = ({ goalId, done, cursor, size = 20 }: UseGoalTodosParams) => {
  return useQuery({
    queryKey: ["todos", goalId, done, cursor],
    queryFn: async () => {
      const { data } = await instance.get<TodosResponse>(`/todos`, {
        params: {
          goalId,
          done,
          cursor,
          size,
        },
      });
      return data;
    },
  });
};
