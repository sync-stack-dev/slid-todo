import { instance } from "@/lib/axios";
import { Todo } from "./types";

interface TodosResponse {
  todos: Todo[];
  nextCursor: number | null;
  totalCount: number;
}

export const getTodos = async (pageParam: number = 0) => {
  const size = 40;

  try {
    console.log("요청 파라미터:", { size, cursor: pageParam }); // 요청 파라미터 확인

    const response = await instance.get<TodosResponse>("/todos", {
      params: {
        size,
        cursor: pageParam || undefined,
      },
    });

    const { todos, nextCursor, totalCount } = response.data;

    console.log(`=== ${pageParam === 0 ? "첫번째" : "두번째"} 요청 결과 ===`);
    console.log("총 개수:", todos.length);
    console.log("nextCursor:", nextCursor);
    console.log("데이터 샘플:");
    todos.slice(0, 3).forEach((todo) => {
      console.log({
        id: todo.id,
        title: todo.title,
        goalTitle: todo.goal?.title,
        createdAt: new Date(todo.createdAt).toLocaleString(),
      });
    });
    console.log("==================");

    return {
      todos,
      nextCursor,
      totalCount,
    };
  } catch (error) {
    console.error("할 일 조회 실패:", error);
    throw error;
  }
};
