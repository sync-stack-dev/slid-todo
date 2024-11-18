import { instance } from "@/lib/axios";
import { Todo } from "@/actions/todo/types";

interface TodosResponse {
  todos: Todo[];
  nextCursor: number | null;
  totalCount: number;
}

export const getTodos = async (cursor: number = 0) => {
  const size = 40;

  try {
    const response = await instance.get<TodosResponse>("/todos", {
      params: {
        size,
        cursor: cursor || undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.error("할 일 조회 실패:", error);
    throw error;
  }
};
