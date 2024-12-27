import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";
import GoalPage from "@/app/(routes)/goals/[goalId]/page";
import { useParams } from "next/navigation";
import { useGoal } from "@/hooks/goals/use-goal";
import { screen, act } from "@testing-library/react";
jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({
    goalId: "1",
  }),
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/goals/use-goal", () => ({
  useGoal: jest.fn(),
}));

describe("GoalPage", () => {
  const mockGoal = {
    id: 1,
    title: "Test Goal",
    progress: 50,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    userId: 1,
    teamId: "1",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ goalId: "1" });
    (useGoal as jest.Mock).mockReturnValue({
      data: mockGoal,
      isLoading: false,
      error: null,
    });
  });

  it("목표 페이지를 렌더링한다", async () => {
    await act(async () => {
      renderWithProviders(<GoalPage />);
    });

    expect(screen.getByText("목표")).toBeInTheDocument();
  });

  it("로딩 중일 때 Loading 컴포넌트를 표시한다", async () => {
    (useGoal as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      renderWithProviders(<GoalPage />);
    });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
