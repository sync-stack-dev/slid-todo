import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
        },
      });
      return response.data;
    },
  });
};

// 단일 id todo 조회 -> useTodosOnce 캐시된 리스트 기반
export const useTodoById = (id: number) => {
  const { data, ...rest } = useTodosOnce();
  const todo = data?.todos?.find((item) => item.id === id) || null;

  return { todo, ...rest };
};
// 최신 4개 todos
export const useRecentTodos = () => {
  return useQuery<TodosResponse>({
    queryKey: ["todos", "Recent"],  // 쿼리 키
    queryFn: async () => {
      const size = 40;  // 서버에서 40개의 할 일을 가져옴
      const response = await instance.get<TodosResponse>("/todos", {
        params: {
          size,
        },
      });
     
      if (response.data?.todos) {
        // `todos` 배열이 있을 경우 생성일 기준으로 최신 4개만 가져옴
        const latestTodos = response.data.todos
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 생성일 기준 내림차순 정렬
          .slice(0, 4);  // 최신 4개만 반환

        return { todos: latestTodos };  // 최신 4개 할 일을 포함한 객체 반환
      }
      return { todos: [] };
    },
  });
};
