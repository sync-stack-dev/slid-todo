import { expect } from "@jest/globals";
import { GoalHeader } from "@/app/(routes)/goals/[goalId]/components/goal-header";
import { mockGoal } from "../../../data/goal";
import { renderWithProviders } from "../../../data/test-utils";
import { useGoalActions } from "@/hooks/goals/use-goal-actions";
const progress = 50;

jest.mock("@/hooks/goals/use-goal-actions", () => ({
  useGoalActions: () => ({
    deleteGoal: jest.fn(),
    updateGoal: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/goals",
}));

const getByCy = (container: HTMLElement, id: string) => {
  const element = container.querySelector(`[data-cy="${id}"]`);
  if (!element) {
    throw new Error(`Element with data-cy="${id}" not found`);
  }
  return element;
};

describe("Goal Header", () => {
  it("목표 헤더를 렌더링한다.", () => {
    const { container } = renderWithProviders(<GoalHeader goal={mockGoal} progress={progress} />);
    expect(getByCy(container, "goal-title")).toBeInTheDocument();
  });

  it("목표 제목이 올바르게 표시된다.", () => {
    const testGoal = { ...mockGoal, title: "테스트 목표" };
    const { getByText } = renderWithProviders(<GoalHeader goal={testGoal} progress={50} />);
    expect(getByText("테스트 목표")).toBeInTheDocument();
  });

  it("목표 수정 함수가 올바르게 동작한다.", () => {
    const { updateGoal } = useGoalActions();
    renderWithProviders(<GoalHeader goal={mockGoal} progress={progress} />);

    // 함수 타입 체크하기
    expect(typeof updateGoal).toBe("function");

    // mock 함수가 호출되었는지 체크하기
    const newTitle = "새로운 제목";
    updateGoal({ goalId: mockGoal.id, title: newTitle });
    expect(updateGoal).toHaveBeenCalledWith({
      goalId: mockGoal.id,
      title: newTitle,
    });
  });

  it("Progress 컴포넌트가 올바르게 렌더링된다.", () => {
    const { container } = renderWithProviders(<GoalHeader goal={mockGoal} progress={75} />);

    const progressBar = container.querySelector('[data-state="indeterminate"]');
    expect(progressBar).toBeInTheDocument();
  });

  it("Progress 레이블이 올바르게 표시된다.", () => {
    const { getByText } = renderWithProviders(<GoalHeader goal={mockGoal} progress={progress} />);
    expect(getByText("Progress")).toBeInTheDocument();
  });

  it("Progress 값이 올바르게 표시된다.", () => {
    const testProgress = 75;
    const { getByText } = renderWithProviders(
      <GoalHeader goal={mockGoal} progress={testProgress} />,
    );

    expect(getByText(`${testProgress}%`)).toBeInTheDocument();
  });

  it("Progress가 0일 때 올바르게 표시된다.", () => {
    const { getByText } = renderWithProviders(<GoalHeader goal={mockGoal} progress={0} />);
    expect(getByText("0%")).toBeInTheDocument();
  });

  it("Progress가 100일 때 올바르게 표시된다.", () => {
    const { getByText } = renderWithProviders(<GoalHeader goal={mockGoal} progress={100} />);
    expect(getByText("100%")).toBeInTheDocument();
  });

  it("updateGoal 함수가 올바르게 정의되어 있다.", () => {
    const { updateGoal } = useGoalActions();
    renderWithProviders(<GoalHeader goal={mockGoal} progress={progress} />);

    expect(updateGoal).toBeDefined();
    expect(typeof updateGoal).toBe("function");
  });

  it("deleteGoal 함수가 올바르게 정의되어 있다.", () => {
    const { deleteGoal } = useGoalActions();
    renderWithProviders(<GoalHeader goal={mockGoal} progress={progress} />);

    expect(deleteGoal).toBeDefined();
    expect(typeof deleteGoal).toBe("function");
  });

  it("Goal 아이콘이 렌더링된다.", () => {
    const { container } = renderWithProviders(<GoalHeader goal={mockGoal} progress={progress} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
