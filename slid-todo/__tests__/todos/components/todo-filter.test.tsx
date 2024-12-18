import { render, fireEvent } from "@testing-library/react";
import TodoFilter from "@/app/(routes)/(todos)/todos/components/todo-filter";
import { expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";

describe("Todo Filter", () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it("모든 탭을 렌더링한다.", () => {
    const { getByText } = render(<TodoFilter activeTab="all" onTabChange={mockOnTabChange} />);

    expect(getByText("All")).toBeInTheDocument();
    expect(getByText("To do")).toBeInTheDocument();
    expect(getByText("Done")).toBeInTheDocument();
  });

  it("탭을 클릭하면 올바른 값으로 탭이 변경된다.", () => {
    const { getByRole } = render(<TodoFilter activeTab="all" onTabChange={mockOnTabChange} />);

    // Radix UI의 tab role과 id를 사용
    const todoTab = getByRole("tab", { name: "To do" });

    // mouseDown과 mouseUp 이벤트를 모두 발생시킴
    fireEvent.mouseDown(todoTab);
    fireEvent.mouseUp(todoTab);
    fireEvent.click(todoTab);

    expect(mockOnTabChange).toHaveBeenCalledWith("todo");
  });

  it("activeTab prop에 따라 올바른 탭이 활성화된다.", () => {
    const { getByRole } = render(<TodoFilter activeTab="todo" onTabChange={mockOnTabChange} />);

    const todoTab = getByRole("tab", { name: "To do" });
    expect(todoTab.getAttribute("data-state")).toBe("active");
  });

  it("각 탭 클릭 시 한 번만 호출된다.", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<TodoFilter activeTab="all" onTabChange={mockOnTabChange} />);

    const todoTab = getByRole("tab", { name: "To do" });
    await user.click(todoTab);

    expect(mockOnTabChange).toHaveBeenCalledTimes(1);

    const doneTab = getByRole("tab", { name: "Done" });
    await user.click(doneTab);

    expect(mockOnTabChange).toHaveBeenCalledTimes(2);
  });
});
