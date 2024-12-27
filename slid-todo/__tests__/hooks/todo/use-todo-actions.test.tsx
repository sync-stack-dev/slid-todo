import { renderHook, waitFor } from "@testing-library/react";
import { useCreateTodo } from "@/hooks/todo/use-todo-actions";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { expect } from "@jest/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { FC } from "react";

jest.mock("@/providers/toast-provider", () => ({
  ToastProvider: () => null,
}));

jest.mock("@/lib/axios", () => ({
  instance: {
    post: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("useCreateTodo", () => {
  let queryClient: QueryClient;
  let consoleErrorSpy: jest.SpyInstance;
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

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

      // todos 쿼리 무효화만 확인
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
