import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import { Todo } from "@/types/todo";

interface TodosResponse {
  totalCount: number;
  nextCursor: number;
  todos: Todo[];
  done: boolean;
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

export const useGoalTodosInfinite = (goalId: number, done?: boolean) => {
  return useInfiniteQuery({
    queryKey: ["todos", goalId, done, "infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await instance.get<TodosResponse>(`/todos`, {
        params: {
          goalId,
          cursor: pageParam || undefined,
          done,
          size: 20,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
