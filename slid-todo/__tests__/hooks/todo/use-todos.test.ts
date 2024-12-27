import { renderHook, waitFor } from "@testing-library/react";
import {
  useTodosInfinite,
  useTodosOnce,
  useTodoById,
  useRecentTodos,
} from "@/hooks/todo/use-todos";
import { instance } from "@/lib/axios";
import { TestWrapper } from "../../data/test-utils";
import { expect } from "@jest/globals";
import { Todo, TodosResponse } from "@/types/todo";
import { mockTodoData, mockTodoList } from "../../data/todo";

jest.mock("@/lib/axios");

// 공통 테스트 데이터
const mockResponses = {
  page1: {
    todos: mockTodoList.slice(0, 2),
    nextCursor: 2,
    totalCount: 4,
  } as TodosResponse,

  page2: {
    todos: mockTodoList.slice(2, 4),
    nextCursor: undefined,
    totalCount: 4,
  } as TodosResponse,

  all: {
    todos: mockTodoList,
    totalCount: mockTodoList.length,
  } as TodosResponse,

  single: mockTodoData(1),

  recent: {
    todos: mockTodoList.slice(0, 4),
  } as TodosResponse,
};

const mockApiResponse = (data: any) => ({ data });

describe("useTodosInfinite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("데이터 패칭", () => {
    it("초기 페이지를 성공적으로 로드한다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce(mockApiResponse(mockResponses.page1));

      const { result } = renderHook(() => useTodosInfinite(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data?.pages[0]).toEqual(mockResponses.page1);
      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: {
          size: 40,
          cursor: undefined,
        },
      });
    });

    it("페이지 크기(size)가 올바르게 적용된다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce(mockApiResponse(mockResponses.page1));

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
        .mockResolvedValueOnce(mockApiResponse(mockResponses.page1))
        .mockResolvedValueOnce(mockApiResponse(mockResponses.page2));

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

describe("useTodosOnce", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("데이터 패칭", () => {
    it("모든 할 일을 한 번에 가져온다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce(mockApiResponse(mockResponses.all));

      const { result } = renderHook(() => useTodosOnce(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponses.all);
      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: {
          size: Number.MAX_SAFE_INTEGER,
        },
      });
    });
  });

  describe("에러 처리", () => {
    it("데이터 로딩 실패시 에러를 반환한다", async () => {
      const error = new Error("Failed to fetch");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTodosOnce(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });
});

describe("useTodoById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("데이터 패칭", () => {
    it("특정 ID의 할 일을 성공적으로 가져온다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce(mockApiResponse(mockResponses.single));

      const { result } = renderHook(() => useTodoById(1), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponses.single);
      expect(instance.get).toHaveBeenCalledWith("/todos/1");
    });

    it("ID가 없을 경우 요청을 보내지 않는다", () => {
      renderHook(() => useTodoById(0), {
        wrapper: TestWrapper,
      });

      expect(instance.get).not.toHaveBeenCalled();
    });
  });

  describe("에러 처리", () => {
    it("데이터 로딩 실패시 에러를 반환한다", async () => {
      const error = new Error("Failed to fetch");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTodoById(1), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });
});

describe("useRecentTodos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("데이터 패칭", () => {
    it("최신 4개의 할 일을 가져온다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce(
        mockApiResponse({
          todos: mockTodoList.slice(0, 4),
        }),
      );

      const { result } = renderHook(() => useRecentTodos(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual({
        todos: mockTodoList.slice(0, 4),
      });

      expect(instance.get).toHaveBeenCalledWith("/todos", {
        params: {
          size: 40,
        },
      });
    });

    it("데이터가 없을 경우 빈 배열을 반환한다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce(mockApiResponse({ todos: [] }));

      const { result } = renderHook(() => useRecentTodos(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data?.todos).toEqual([]);
    });
  });
  describe("에러 처리", () => {
    it("데이터 로딩 실패시 에러를 반환한다", async () => {
      const error = new Error("Failed to fetch");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useRecentTodos(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });
});
