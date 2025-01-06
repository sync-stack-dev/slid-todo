import { screen } from "@testing-library/react";
import AppSidebarGoal from "@/components/shared/app-sidebar/components/app-sidebar-goal";
import { renderWithProviders } from "../../data/test-utils";
import { mockGoalList } from "../../data/goal";
import { expect } from "@jest/globals";
// useGoals hook mock
const mockUseGoals = jest.fn();
jest.mock("@/hooks/goals/use-goals", () => ({
  useGoals: () => mockUseGoals(),
}));

describe("AppSidebarGoal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("로딩 상태", () => {
    it("로딩 중일 때 Skeleton들이 표시되어야 함", () => {
      mockUseGoals.mockReturnValue({ isLoading: true });
      renderWithProviders(<AppSidebarGoal />);

      const skeletons = screen.getAllByTestId("skeleton");
      expect(skeletons).toHaveLength(5);

      expect(skeletons[0]).toHaveClass("w-[16px]", "h-[16px]", "mr-3", "rounded-full");
      expect(skeletons[1]).toHaveClass("h-[22px]", "w-24", "rounded-xl");
      expect(skeletons[2]).toHaveClass("h-4", "w-3/4", "rounded-xl");
      expect(skeletons[3]).toHaveClass("h-4", "w-2/3", "rounded-xl");
      expect(skeletons[4]).toHaveClass("h-4", "w-1/2", "rounded-xl");
    });
  });

  describe("데이터 없음 상태", () => {
    it("데이터가 없을 때 '목표 없음' 메시지가 표시되어야 함", () => {
      mockUseGoals.mockReturnValue({ data: null, isLoading: false });
      renderWithProviders(<AppSidebarGoal />);

      expect(screen.getByText("목표 없음")).toBeInTheDocument();
    });
  });

  describe("데이터 로드 완료 상태", () => {
    beforeEach(() => {
      mockUseGoals.mockReturnValue({
        data: { goals: mockGoalList },
        isLoading: false,
      });
    });

    it("Flag 아이콘과 '목표' 텍스트가 표시되어야 함", () => {
      renderWithProviders(<AppSidebarGoal />);

      const flagIcon = screen.getByLabelText("목표");
      expect(flagIcon).toBeInTheDocument();
      expect(screen.getByText("목표")).toBeInTheDocument();
    });

    it("모든 목표가 링크로 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarGoal />);

      mockGoalList.forEach((goal) => {
        const link = screen.getByText(`· ${goal.title}`);
        expect(link).toBeInTheDocument();
        expect(link.closest("a")).toHaveAttribute("href", `/goals/${goal.id}`);
        expect(link.closest("a")).toHaveAttribute("data-cy", "sidebar-goal-select-item");
      });
    });

    it("목표 링크에 hover 스타일이 적용되어야 함", () => {
      renderWithProviders(<AppSidebarGoal />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass(
          "hover:bg-slate-200",
          "dark:hover:bg-slate-700",
          "hover:cursor-pointer",
          "rounded-lg",
        );
      });
    });

    it("다크 모드 텍스트 스타일이 적용되어야 함", () => {
      renderWithProviders(<AppSidebarGoal />);

      const container = screen.getByText("목표").parentElement?.nextElementSibling;
      expect(container).toHaveClass("dark:text-slate-300");
    });
  });
});
