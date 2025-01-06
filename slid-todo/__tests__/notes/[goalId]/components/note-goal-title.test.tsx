import { render, screen } from "@testing-library/react";
import NoteGoalTitle from "@/app/(routes)/notes/[goalId]/components/note-goal-title";
import { expect } from "@jest/globals";
describe("NoteGoalTitle", () => {
  it("목표 제목이 올바르게 렌더링되어야 함", () => {
    const testTitle = "테스트 목표";
    render(<NoteGoalTitle goalTitle={testTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it("Goal 아이콘이 렌더링되어야 함", () => {
    render(<NoteGoalTitle goalTitle="테스트 목표" />);

    const goalIcon = document.querySelector("svg");
    expect(goalIcon).toBeInTheDocument();
  });
});
