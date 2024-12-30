import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecentTodos } from "@/hooks/todo/use-todos";
import { instance } from "@/lib/axios";
import { mockTodoData } from "../data/todo";
import { expect } from "@jest/globals";

// axios 인스턴스를 모의(Mock) 처리
jest.mock("@/lib/axios", () => ({
  instance: {
    get: jest.fn(),
  },
}));

// 테스트 환경에서 QueryClientProvider를 설정
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useRecentTodos Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("최신 4개의 할 일만 반환되는지 확인", async () => {
    const mockTodoList = [
      mockTodoData(1),
      mockTodoData(2),
      mockTodoData(3),
      mockTodoData(4),
      mockTodoData(5),
    ];

    (instance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        todos: mockTodoList,
        nextCursor: 5,
        totalCount: 5,
      },
    });

    const { result } = renderHook(() => useRecentTodos(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const todos = result.current.data?.todos || [];
    expect(todos.length).toBe(4);
    expect(todos[0].id).toBe(1);
    expect(todos[3].id).toBe(4);

    expect(new Date(todos[0].createdAt).getTime()).toBeGreaterThanOrEqual(
      new Date(todos[1].createdAt).getTime(),
    );
    expect(new Date(todos[1].createdAt).getTime()).toBeGreaterThanOrEqual(
      new Date(todos[2].createdAt).getTime(),
    );
    expect(new Date(todos[2].createdAt).getTime()).toBeGreaterThanOrEqual(
      new Date(todos[3].createdAt).getTime(),
    );
  });

  it("todos 데이터가 없으면 빈 배열을 반환해야 함", async () => {
    (instance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        todos: [],
        nextCursor: 0,
        totalCount: 0,
      },
    });

    const { result } = renderHook(() => useRecentTodos(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const todos = result.current.data?.todos || [];
    expect(todos).toHaveLength(0);
  });

  it("todos가 4개 미만일 때 빈 배열이 아닌 할 일들을 반환해야 함", async () => {
    const mockTodoList = [mockTodoData(1), mockTodoData(2)];

    (instance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        todos: mockTodoList,
        nextCursor: 2,
        totalCount: 2,
      },
    });

    const { result } = renderHook(() => useRecentTodos(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const todos = result.current.data?.todos || [];
    expect(todos.length).toBe(2);
  });

  it("isLoading 상태가 true로 시작하는지 확인", async () => {
    const { result } = renderHook(() => useRecentTodos(), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });
});
