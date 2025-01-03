import { renderHook, waitFor } from "@testing-library/react";
import { useGoal } from "@/hooks/goals/use-goal";
import { instance } from "@/lib/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect } from "@jest/globals";
import { mockGoal } from "../../data/goal";
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/lib/axios");

const originalLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalLog;
});

describe("useGoal", () => {
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

  const mockGoalData = {
    data: {
      id: 1,
      title: "Test Goal",
      updatedAt: "2024-03-20T00:00:00Z",
      createdAt: "2024-03-20T00:00:00Z",
      userId: 123,
      teamId: "team1",
    },
  };

  const mockProgressData = {
    data: {
      progress: 75,
    },
  };

  it("성공적으로 목표와 진행률 데이터를 가져온다", async () => {
    (instance.get as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockGoalData))
      .mockImplementationOnce(() => Promise.resolve(mockProgressData));

    const { result } = renderHook(() => useGoal(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      ...mockGoalData.data,
      progress: 75,
    });

    expect(instance.get).toHaveBeenCalledWith("/goals/1");
    expect(instance.get).toHaveBeenCalledWith("/todos/progress", {
      params: { goalId: 1 },
    });
  });

  it("목표 데이터가 없을 경우 404 에러를 처리한다", async () => {
    (instance.get as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 404,
        data: { message: "목표를 찾을 수 없습니다." },
      },
    });

    const { result } = renderHook(() => useGoal(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith("/");
      },
      { timeout: 3000 },
    );

    expect(result.current.error).toEqual(new Error("목표를 찾을 수 없습니다."));
  });
  it("진행률이 없을 경우 0으로 설정된다", async () => {
    (instance.get as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockGoalData))
      .mockImplementationOnce(() => Promise.resolve({ data: {} }));

    const { result } = renderHook(() => useGoal(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      ...mockGoalData.data,
      progress: 0,
    });
  });

  it("API 에러를 처리한다", async () => {
    const errorMessage = "Network Error";
    (instance.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useGoal(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(new Error(errorMessage));
  });
});
