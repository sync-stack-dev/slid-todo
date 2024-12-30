import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyProgress from "@/app/(routes)/dashboard/components/progress-block/board-progress";
import { useProgress } from "@/hooks/goals/use-dashboard-goals";
import { expect } from "@jest/globals";
// useProgress 훅을 mock 처리
jest.mock("@/hooks/goals/use-dashboard-goals", () => ({
  useProgress: jest.fn(),
}));

describe("MyProgress 컴포넌트", () => {
  const queryClient = new QueryClient();

  // 테스트 환경에서 QueryClientProvider를 설정
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("진행률 데이터가 잘 표시되는지 확인", async () => {
    // useProgress 훅이 반환할 데이터 설정
    (useProgress as jest.Mock).mockReturnValue({ data: 70 });

    // MyProgress 컴포넌트 렌더링
    render(<MyProgress />, { wrapper });

    // 진행률 숫자가 올바르게 렌더링되는지 확인
    expect(screen.getByText("70")).toBeInTheDocument(); // 진행률이 70%로 표시되는지 확인
    expect(screen.getByText("%")).toBeInTheDocument(); // "%" 문자가 함께 표시되는지 확인
  });

  it("진행률이 없을 경우 0으로 표시되는지 확인", async () => {
    // useProgress 훅이 반환할 데이터 설정 (없을 경우 0으로 처리)
    (useProgress as jest.Mock).mockReturnValue({ data: undefined });

    // MyProgress 컴포넌트 렌더링
    render(<MyProgress />, { wrapper });

    // 진행률이 0%로 표시되는지 확인
    expect(screen.getByText("0")).toBeInTheDocument(); // 진행률이 0%로 표시되는지 확인
    expect(screen.getByText("%")).toBeInTheDocument(); // "%" 문자가 함께 표시되는지 확인
  });
});
