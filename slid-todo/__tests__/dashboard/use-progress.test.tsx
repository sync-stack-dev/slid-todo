import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProgress } from "@/hooks/goals/use-dashboard-goals";
import { instance } from "@/lib/axios";
import { expect } from "@jest/globals";

// axios 인스턴스를 모의(Mock) 처리
jest.mock("@/lib/axios", () => ({
  instance: {
    get: jest.fn(),
  },
}));

describe("useProgress Hook", () => {
  const queryClient = new QueryClient();

  // 테스트 환경에서 QueryClientProvider를 설정
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    jest.clearAllMocks(); // Mock 데이터 초기화
  });

  it("요청시 데이터가 잘 반환되는가", async () => {
    // API 응답을 모의 처리
    (instance.get as jest.Mock).mockResolvedValueOnce({
      data: { progress: 70 }, // mock progress data 설정
    });

    // 훅을 렌더링
    const { result } = renderHook(() => useProgress(), { wrapper });

    // 성공 상태로 업데이트될 때까지 대기
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // 반환된 데이터가 올바른지 확인
    expect(result.current.data).toBe(70); // 올바른 데이터 반환 확인
    expect(instance.get).toHaveBeenCalledWith("/todos/progress"); // API 호출 경로 확인
  });
});
