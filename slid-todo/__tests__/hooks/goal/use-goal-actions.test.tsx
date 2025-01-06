import { renderHook, waitFor } from "@testing-library/react";
import { useGoalActions } from "@/hooks/goals/use-goal-actions";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { expect } from "@jest/globals";

jest.mock("@/lib/axios", () => ({
  instance: {
    post: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
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

describe("Goal Actions", () => {
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

  describe("createGoal", () => {
    it("성공 시 goals 쿼리가 무효화된다", async () => {
      (instance.post as jest.Mock).mockResolvedValueOnce({
        data: { id: 1, title: "테스트 목표" },
      });

      const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.createGoal({ title: "테스트 목표" });

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ["goals"],
        });
      });

      expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1);
      invalidateQueriesSpy.mockRestore();
    });

    it("목표를 성공적으로 생성한다", async () => {
      (instance.post as jest.Mock).mockResolvedValueOnce({
        data: { id: 1, title: "테스트 목표" },
      });

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.createGoal({ title: "테스트 목표" });

      await waitFor(() => {
        expect(instance.post).toHaveBeenCalledWith("/goals", {
          title: "테스트 목표",
        });
        expect(toast.success).toHaveBeenCalledWith("목표가 추가되었습니다.");
      });
    });

    it("실패 시 에러 토스트를 표시한다", async () => {
      const error = new Error("API Error");
      (instance.post as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.createGoal({ title: "테스트 목표" });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("목표 추가에 실패했습니다.");
      });
    });
  });

  describe("updateGoal", () => {
    it("성공 시 goals 쿼리가 무효화된다", async () => {
      (instance.patch as jest.Mock).mockResolvedValueOnce({
        data: { id: 1, title: "수정된 목표" },
      });

      const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.updateGoal({ goalId: 1, title: "수정된 목표" });

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ["goals"],
        });
      });

      expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1);
      invalidateQueriesSpy.mockRestore();
    });

    it("목표를 성공적으로 수정한다", async () => {
      (instance.patch as jest.Mock).mockResolvedValueOnce({
        data: { id: 1, title: "수정된 목표" },
      });

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.updateGoal({ goalId: 1, title: "수정된 목표" });

      await waitFor(() => {
        expect(instance.patch).toHaveBeenCalledWith("goals/1", {
          title: "수정된 목표",
        });
        expect(toast.success).toHaveBeenCalledWith("목표가 수정되었습니다.");
      });
    });

    it("실패 시 에러 토스트를 표시한다", async () => {
      const error = { response: { data: { message: "커스텀 에러 메시지" } } };
      (instance.patch as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.updateGoal({ goalId: 1, title: "수정된 목표" });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("커스텀 에러 메시지");
      });
    });
  });

  describe("deleteGoal", () => {
    it("성공 시 goals 쿼리가 무효화되고 리다이렉트된다", async () => {
      (instance.delete as jest.Mock).mockResolvedValueOnce({});

      const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");
      const mockRouter = { push: jest.fn() };
      (useRouter as jest.Mock).mockReturnValue(mockRouter);

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.deleteGoal(1);

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ["goals"],
        });
        expect(instance.delete).toHaveBeenCalledWith("goals/1");
        expect(toast.success).toHaveBeenCalledWith("목표가 삭제되었습니다.");
      });

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(mockRouter.push).toHaveBeenCalledWith("/todos");

      invalidateQueriesSpy.mockRestore();
    });

    it("실패 시 에러 토스트를 표시한다", async () => {
      const error = { response: { data: { message: "삭제 실패 메시지" } } };
      (instance.delete as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useGoalActions(), { wrapper: Wrapper });

      result.current.deleteGoal(1);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("삭제 실패 메시지");
      });
    });
  });
});
