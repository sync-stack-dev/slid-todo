import { renderHook } from "@testing-library/react";
import { useGoals } from "@/hooks/goals/use-goals";
import { instance } from "@/lib/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { waitFor } from "@testing-library/react";
import { mockGoalsResponse } from "../../data/goal";
import { expect } from "@jest/globals";
jest.mock("@/lib/axios");

describe("useGoals", () => {
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

  it("성공적으로 목표 목록을 가져온다", async () => {
    const mockData = mockGoalsResponse();
    (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGoals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(instance.get).toHaveBeenCalledWith("/goals");
  });

  it("enabled가 false일 때 쿼리를 실행하지 않는다", async () => {
    const { result } = renderHook(() => useGoals({ enabled: false }), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(instance.get).not.toHaveBeenCalled();
  });

  it("API 에러를 처리한다", async () => {
    const error = new Error("API Error");
    (instance.get as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useGoals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
  });

  it("데이터 구조가 올바르다", async () => {
    const mockData = mockGoalsResponse(2);
    (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGoals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toMatchObject({
      nextCursor: expect.any(Number),
      goals: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
          userId: expect.any(Number),
          teamId: expect.any(String),
        }),
      ]),
      totalCount: expect.any(Number),
    });
  });
});
