import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import { TodosResponse } from "@/types/todo";

export const useTodosInfinite = () => {
  return useInfiniteQuery<TodosResponse>({
    queryKey: ["todos", "infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const size = 40;
      const response = await instance.get<TodosResponse>("/todos", {
        params: {
          size,
          cursor: pageParam || undefined,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

export const useTodosOnce = () => {
  return useQuery<TodosResponse>({
    queryKey: ["todos", "once"],
    queryFn: async () => {
      const size = 40;
      const response = await instance.get<TodosResponse>("/todos", {
        params: {
          size,
          cursor: 0,
        },
      });
      return response.data;
    },
  });
};
