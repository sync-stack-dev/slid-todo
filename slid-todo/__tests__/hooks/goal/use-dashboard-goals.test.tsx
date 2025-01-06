import { renderHook, waitFor } from "@testing-library/react";
import { useGoalListInfinite, useProgress } from "@/hooks/goals/use-dashboard-goals";
import { instance } from "@/lib/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { expect } from "@jest/globals";
jest.mock("@/lib/axios", () => ({
  instance: {
    get: jest.fn(),
  },
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

describe("Dashboard Goals Hooks", () => {
  let queryClient: QueryClient;
  let Wrapper: FC<PropsWithChildren>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    Wrapper = createWrapper(queryClient);
    jest.clearAllMocks();
  });

  describe("useGoalListInfinite", () => {
    const mockGoalsResponse = (cursor: number) => ({
      goals: [
        {
          id: cursor + 1,
          title: `Goal ${cursor + 1}`,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          userId: 1,
          teamId: "team1",
        },
        {
          id: cursor + 2,
          title: `Goal ${cursor + 2}`,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          userId: 1,
          teamId: "team1",
        },
      ],
      nextCursor: cursor + 2,
      totalCount: 10,
    });

    const mockProgressResponse = (progress: number) => ({
      data: { progress },
    });

    it("첫 페이지를 성공적으로 가져온다", async () => {
      const goalsResponse = mockGoalsResponse(0);
      (instance.get as jest.Mock)
        .mockResolvedValueOnce({ data: goalsResponse })
        .mockResolvedValueOnce(mockProgressResponse(50))
        .mockResolvedValueOnce(mockProgressResponse(75));

      const { result } = renderHook(() => useGoalListInfinite(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.pages[0].goals).toHaveLength(2);
      expect(result.current.data?.pages[0].goals[0].progress).toBe(50);
      expect(result.current.data?.pages[0].goals[1].progress).toBe(75);
    });

    it("다음 페이지를 가져올 수 있다", async () => {
      const firstPage = mockGoalsResponse(0);
      const secondPage = mockGoalsResponse(2);

      (instance.get as jest.Mock)
        .mockResolvedValueOnce({ data: firstPage })
        .mockResolvedValueOnce(mockProgressResponse(50))
        .mockResolvedValueOnce(mockProgressResponse(75))
        .mockResolvedValueOnce({ data: secondPage })
        .mockResolvedValueOnce(mockProgressResponse(60))
        .mockResolvedValueOnce(mockProgressResponse(80));

      const { result } = renderHook(() => useGoalListInfinite(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      result.current.fetchNextPage();

      await waitFor(() => {
        expect(result.current.data?.pages).toHaveLength(2);
      });

      expect(result.current.data?.pages[1].goals[0].progress).toBe(60);
      expect(result.current.data?.pages[1].goals[1].progress).toBe(80);
    });

    it("에러가 발생하면 에러 상태를 반환한다", async () => {
      const error = new Error("API Error");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useGoalListInfinite(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });
  });

  describe("useProgress", () => {
    it("전체 진행률을 성공적으로 가져온다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({
        data: { progress: 65 },
      });

      const { result } = renderHook(() => useProgress(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe(65);
    });

    it("에러가 발생하면 에러 상태를 반환한다", async () => {
      const error = new Error("API Error");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useProgress(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBe(error);
    });

    it("올바른 엔드포인트로 요청한다", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({
        data: { progress: 65 },
      });

      renderHook(() => useProgress(), { wrapper: Wrapper });

      expect(instance.get).toHaveBeenCalledWith("/todos/progress");
    });
  });
});
