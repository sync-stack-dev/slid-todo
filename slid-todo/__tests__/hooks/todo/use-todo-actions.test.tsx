import { renderHook, waitFor } from "@testing-library/react";
import { useCreateTodo, useDeleteTodo } from "@/hooks/todo/use-todo-actions";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { expect } from "@jest/globals";
import { mockTodoData } from "../../data/todo";

jest.mock("@/lib/axios", () => ({
  instance: {
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const createWrapper = (queryClient: QueryClient): FC<PropsWithChildren> => {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = "QueryClientWrapper";
  return Wrapper;
};

describe("Todo Actions", () => {
  let queryClient: QueryClient;
  let consoleErrorSpy: jest.SpyInstance;
  let Wrapper: FC<PropsWithChildren>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    Wrapper = createWrapper(queryClient);
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("useCreateTodo", () => {
    describe("기본 생성", () => {
      it("성공 시 todos 쿼리가 무효화된다", async () => {
        (instance.post as jest.Mock).mockResolvedValueOnce({
          data: { id: 1, title: "테스트 할일" },
        });

        const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await result.current.mutateAsync({ title: "테스트 할일" });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ["todos"],
        });
        expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1);

        invalidateQueriesSpy.mockRestore();
      });

      it("제목만 있는 기본 Todo를 생성한다", async () => {
        (instance.post as jest.Mock).mockResolvedValueOnce({
          data: { id: 1, title: "테스트 할일" },
        });

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await result.current.mutateAsync({ title: "테스트 할일" });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(instance.post).toHaveBeenCalledWith("/todos", {
          title: "테스트 할일",
        });
        expect(result.current.isPending).toBe(false);
        expect(toast.success).toHaveBeenCalledWith("할 일이 추가되었습니다.");
      });

      it("성공 시 성공 toast가 표시된다", async () => {
        (instance.post as jest.Mock).mockResolvedValueOnce({
          data: { id: 1, title: "테스트 할일" },
        });

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await result.current.mutateAsync({ title: "테스트 할일" });

        expect(toast.success).toHaveBeenCalledWith("할 일이 추가되었습니다.");
      });
    });

    describe("추가 필드 생성", () => {
      it("파일 첨부 시 파일 URL이 추가된다", async () => {
        (instance.post as jest.Mock).mockResolvedValueOnce({
          data: { id: 1, title: "테스트 할일", fileUrl: "https://example.com/test.jpg" },
        });

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await result.current.mutateAsync({
          title: "테스트 할일",
          fileUrl: "https://example.com/test.jpg",
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(instance.post).toHaveBeenCalledWith("/todos", {
          title: "테스트 할일",
          fileUrl: "https://example.com/test.jpg",
        });
      });

      it("링크 첨부 시 링크 URL이 추가된다", async () => {
        (instance.post as jest.Mock).mockResolvedValueOnce({
          data: { id: 1, title: "테스트 할일", linkUrl: "https://example.com" },
        });

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await result.current.mutateAsync({
          title: "테스트 할일",
          linkUrl: "https://example.com",
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(instance.post).toHaveBeenCalledWith("/todos", {
          title: "테스트 할일",
          linkUrl: "https://example.com",
        });
      });

      it("목표 첨부 시 목표 ID가 추가된다", async () => {
        (instance.post as jest.Mock).mockResolvedValueOnce({
          data: { id: 1, title: "테스트 할일", goalId: 1 },
        });

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await result.current.mutateAsync({
          title: "테스트 할일",
          goalId: 1,
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(instance.post).toHaveBeenCalledWith("/todos", {
          title: "테스트 할일",
          goalId: 1,
        });
      });

      it("모든 필드가 첨부되면 모든 필드가 추가된다", async () => {
        (instance.post as jest.Mock).mockResolvedValueOnce({
          data: {
            id: 1,
            title: "테스트 할일",
            fileUrl: "https://example.com/test.jpg",
            linkUrl: "https://example.com",
            goalId: 1,
          },
        });

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await result.current.mutateAsync({
          title: "테스트 할일",
          fileUrl: "https://example.com/test.jpg",
          linkUrl: "https://example.com",
          goalId: 1,
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(instance.post).toHaveBeenCalledWith("/todos", {
          title: "테스트 할일",
          fileUrl: "https://example.com/test.jpg",
          linkUrl: "https://example.com",
          goalId: 1,
        });
      });
    });

    describe("에러 처리", () => {
      it("API 호출 실패 시 에러 토스트를 표시한다", async () => {
        const error = new Error("API Error");
        (instance.post as jest.Mock).mockRejectedValueOnce(error);

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await expect(result.current.mutateAsync({ title: "테스트 할일" })).rejects.toThrow();

        await waitFor(() => {
          expect(result.current.isError).toBe(true);
          expect(toast.error).toHaveBeenCalledWith("추가에 실패했습니다.");
        });
      });

      it("API 호출 실패 시 에러를 반환한다", async () => {
        const error = new Error("API Error");
        (instance.post as jest.Mock).mockRejectedValueOnce(error);

        const { result } = renderHook(() => useCreateTodo(), { wrapper: Wrapper });

        await expect(result.current.mutateAsync({ title: "테스트 할일" })).rejects.toThrow(
          "API Error",
        );

        await waitFor(() => {
          expect(result.current.isError).toBe(true);
          expect(result.current.error).toBe(error);
          expect(toast.error).toHaveBeenCalledWith("추가에 실패했습니다.");
          expect(consoleErrorSpy).toHaveBeenCalledWith("API Error:", error);
        });
      });
    });
  });
  describe("useDeleteTodo", () => {
    describe("삭제 동작", () => {
      it("삭제 성공 시 todos 쿼리가 무효화된다", async () => {
        const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

        const { result } = renderHook(() => useDeleteTodo(mockTodoData(1)), { wrapper: Wrapper });

        await result.current.mutateAsync();

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ["todos"],
        });
        expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1);
      });

      it("Todo를 성공적으로 삭제한다", async () => {
        const { result } = renderHook(() => useDeleteTodo(mockTodoData(1)), { wrapper: Wrapper });

        await result.current.mutateAsync();

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        expect(instance.delete).toHaveBeenCalledWith("/todos/1");
        expect(toast.success).toHaveBeenCalledWith("할 일이 삭제되었습니다.");
      });

      it("삭제 실패 시 에러 토스트를 표시한다", async () => {
        const error = new Error("API Error");
        (instance.delete as jest.Mock).mockRejectedValueOnce(error);

        const { result } = renderHook(() => useDeleteTodo(mockTodoData(1)), { wrapper: Wrapper });

        await expect(result.current.mutateAsync()).rejects.toThrow();

        await waitFor(() => {
          expect(toast.error).toHaveBeenCalledWith("삭제에 실패했습니다.");
        });
      });
    });
    describe("에러 처리", () => {
      it("API 호출 실패 시 에러 토스트를 표시한다", async () => {
        const error = new Error("API Error");
        (instance.delete as jest.Mock).mockRejectedValueOnce(error);

        const { result } = renderHook(() => useDeleteTodo(mockTodoData(1)), { wrapper: Wrapper });

        await expect(result.current.mutateAsync()).rejects.toThrow();

        await waitFor(() => {
          expect(toast.error).toHaveBeenCalledWith("삭제에 실패했습니다.");
        });
      });
      it("API 호출 실패 시 에러를 반환한다", async () => {
        const error = new Error("API Error");
        (instance.delete as jest.Mock).mockRejectedValueOnce(error);

        const { result } = renderHook(() => useDeleteTodo(mockTodoData(1)), { wrapper: Wrapper });

        await expect(result.current.mutateAsync()).rejects.toThrow();

        await waitFor(() => {
          expect(result.current.isError).toBe(true);
          expect(result.current.error).toBe(error);
          expect(toast.error).toHaveBeenCalledWith("삭제에 실패했습니다.");
          expect(consoleErrorSpy).toHaveBeenCalledWith("API Error:", error);
        });
      });
    });
  });
});
