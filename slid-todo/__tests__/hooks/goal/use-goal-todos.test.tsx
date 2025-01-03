import { renderHook } from "@testing-library/react";
import { useGoalTodos, useGoalTodosInfinite } from "@/hooks/goals/use-goal-todos";
import { instance } from "@/lib/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";

jest.mock("@/lib/axios");

describe("Goal Todos Hooks", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockTodosResponse = (cursor: number = 0) => ({
    totalCount: 40,
    nextCursor: cursor + 20,
    todos: Array.from({ length: 20 }, (_, i) => ({
      id: cursor + i + 1,
      title: `Todo ${cursor + i + 1}`,
      done: false,
      goalId: 1,
      updatedAt: "2024-01-01T00:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    })),
    done: false,
  });

  describe("useGoalTodos", () => {
    it("성공적으로 할 일 목록을 가져온다", async () => {
      const mockData = mockTodosResponse();
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGoalTodos({ goalId: 1, size: 20 }), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockData);
      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: {
          goalId: 1,
          done: undefined,
          cursor: undefined,
          size: 20,
        },
      });
    });

    it("done 필터가 적용된 할 일 목록을 가져온다", async () => {
      const mockData = mockTodosResponse();
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGoalTodos({ goalId: 1, done: true }), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: expect.objectContaining({
          done: true,
        }),
      });
    });

    it("cursor와 size 파라미터가 적용된다", async () => {
      const mockData = mockTodosResponse(20);
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGoalTodos({ goalId: 1, cursor: 20, size: 10 }), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: expect.objectContaining({
          cursor: 20,
          size: 10,
        }),
      });
    });
  });

  describe("useGoalTodosInfinite", () => {
    it("성공적으로 첫 페이지를 가져온다", async () => {
      const mockData = mockTodosResponse();
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGoalTodosInfinite(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.pages[0]).toEqual(mockData);
      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: {
          goalId: 1,
          cursor: undefined,
          done: undefined,
          size: 20,
        },
      });
    });

    it("다음 페이지를 가져올 수 있다", async () => {
      const firstPage = mockTodosResponse(0);
      const secondPage = mockTodosResponse(20);

      (instance.get as jest.Mock)
        .mockResolvedValueOnce({ data: firstPage })
        .mockResolvedValueOnce({ data: secondPage });

      const { result } = renderHook(() => useGoalTodosInfinite(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      result.current.fetchNextPage();

      await waitFor(() => {
        expect(result.current.data?.pages).toHaveLength(2);
        expect(result.current.data?.pages[1]).toEqual(secondPage);
      });

      expect(instance.get).toHaveBeenCalledTimes(2);
      expect(instance.get).toHaveBeenLastCalledWith("/todos", {
        params: {
          goalId: 1,
          cursor: 20,
          done: undefined,
          size: 20,
        },
      });
    });
    it("done 필터가 적용된 무한 스크롤이 동작한다", async () => {
      const mockData = mockTodosResponse();
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGoalTodosInfinite(1, true), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: expect.objectContaining({
          done: true,
        }),
      });
    });

    it("size 파라미터가 적용된다", async () => {
      const mockData = mockTodosResponse();
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useGoalTodosInfinite(1, undefined, 10), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: expect.objectContaining({
          size: 10,
        }),
      });
    });
  });
});
