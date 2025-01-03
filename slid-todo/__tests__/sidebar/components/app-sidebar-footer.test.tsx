import { screen, fireEvent } from "@testing-library/react";
import { AppSidebarFooter } from "@/components/shared/app-sidebar/components/app-sidebar-footer";
import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";

// Mocks
const mockOnOpen = jest.fn();
const mockCreateGoal = jest.fn();
const mockUseGoals = jest.fn();

jest.mock("@/stores/use-form-modal-store", () => ({
  useFormModal: () => ({
    onOpen: mockOnOpen,
  }),
}));

jest.mock("@/hooks/goals/use-goal-actions", () => ({
  useGoalActions: () => ({
    createGoal: mockCreateGoal,
  }),
}));

jest.mock("@/hooks/goals/use-goals", () => ({
  useGoals: () => mockUseGoals(),
}));

describe("AppSidebarFooter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("로딩 상태", () => {
    it("로딩 중일 때 Skeleton이 표시되어야 함", () => {
      mockUseGoals.mockReturnValue({ isLoading: true });
      renderWithProviders(<AppSidebarFooter />);

      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("h-[40px]", "w-full", "rounded-xl");
    });
  });

  describe("로딩 완료 상태", () => {
    beforeEach(() => {
      mockUseGoals.mockReturnValue({ isLoading: false });
    });

    it("새 목표 버튼이 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarFooter />);

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("새 목표");
      expect(button).toHaveAttribute("data-cy", "create-goal-button");
    });

    it("Plus 아이콘이 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarFooter />);

      const plusIcon = screen.getByLabelText("새 목표 추가");
      expect(plusIcon).toBeInTheDocument();
    });

    it("버튼 클릭시 FormModal이 올바른 설정으로 열려야 함", () => {
      renderWithProviders(<AppSidebarFooter />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockOnOpen).toHaveBeenCalledWith({
        type: "goal",
        mode: "create",
        defaultValues: {
          id: 0,
          title: "",
          description: "",
        },
        onSubmit: expect.any(Function),
      });
    });

    it("FormModal onSubmit 호출시 createGoal이 호출되어야 함", () => {
      renderWithProviders(<AppSidebarFooter />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      const onSubmit = mockOnOpen.mock.calls[0][0].onSubmit;

      const testData = { id: 1, title: "Test Goal", description: "Test Description" };
      onSubmit(testData);

      expect(mockCreateGoal).toHaveBeenCalledWith(testData);
    });

    it("다크 모드 스타일이 적용되어야 함", () => {
      renderWithProviders(<AppSidebarFooter />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("dark:bg-blue-800", "dark:text-white", "dark:hover:bg-blue-700");
    });
  });
});
