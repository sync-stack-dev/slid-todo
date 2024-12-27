import { renderHook, waitFor } from "@testing-library/react";
import { useTodosInfinite } from "@/hooks/todo/use-todos";
import { instance } from "@/lib/axios";
import { TestWrapper } from "../../data/test-utils";
import { expect } from "@jest/globals";
jest.mock("@/lib/axios");

describe("useTodosInfinite", () => {
  const mockTodosPage1 = {
    todos: [
      { id: 1, title: "Todo 1", done: false },
      { id: 2, title: "Todo 2", done: false },
    ],
    nextCursor: 2,
    totalCount: 4,
  };

  const mockTodosPage2 = {
    todos: [
      { id: 3, title: "Todo 3", done: false },
      { id: 4, title: "Todo 4", done: false },
    ],
    nextCursor: null,
    totalCount: 4,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("데이터 패칭", () => {
    it("초기 페이지를 성공적으로 로드한다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({
        data: mockTodosPage1,
      });

      const { result } = renderHook(() => useTodosInfinite(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data?.pages[0]).toEqual(mockTodosPage1);
      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: {
          size: 40,
          cursor: undefined,
        },
      });
    });

    it("페이지 크기(size)가 올바르게 적용된다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({
        data: mockTodosPage1,
      });

      renderHook(() => useTodosInfinite(), {
        wrapper: TestWrapper,
      });

      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: expect.objectContaining({
          size: 40,
        }),
      });
    });

    it("커서 기반 페이지네이션이 올바르게 작동한다", async () => {
      (instance.get as jest.Mock)
        .mockResolvedValueOnce({ data: mockTodosPage1 })
        .mockResolvedValueOnce({ data: mockTodosPage2 });

      const { result } = renderHook(() => useTodosInfinite(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.fetchNextPage();

      expect(instance.get).toHaveBeenNthCalledWith(2, "/todos", {
        params: {
          size: 40,
          cursor: 2,
        },
      });
    });
  });

  describe("에러 처리", () => {
    it("데이터 로딩 실패시 에러를 반환한다", async () => {
      const error = new Error("Failed to fetch");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTodosInfinite(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });
});
