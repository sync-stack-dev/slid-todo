import { renderWithProviders } from "../../data/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { CreateNoteButton } from "@/components/shared/action-buttons/create-note-button";
import { expect } from "@jest/globals";

describe("CreateNoteButton", () => {
  it("버튼이 올바르게 렌더링된다", () => {
    renderWithProviders(<CreateNoteButton />);

    const button = screen.getByRole("button", { name: "create-note-button" });
    expect(button).toBeInTheDocument();
  });

  it("아이콘이 올바르게 렌더링된다", () => {
    renderWithProviders(<CreateNoteButton />);

    const icon = screen.getByLabelText("create-note-button-icon");
    expect(icon).toBeInTheDocument();
  });

  it("클릭 시 onClick 핸들러가 호출된다", () => {
    const handleClick = jest.fn();
    renderWithProviders(<CreateNoteButton onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe("스타일링", () => {
    it("버튼에 올바른 스타일이 적용된다", () => {
      renderWithProviders(<CreateNoteButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "p-1",
        "hover:bg-gray-100",
        "dark:hover:bg-slate-600",
        "rounded-full",
        "aspect-square",
        "w-8",
        "h-8",
      );
    });

    it("아이콘에 올바른 크기가 적용된다", () => {
      renderWithProviders(<CreateNoteButton />);

      const icon = screen.getByLabelText("create-note-button-icon");
      expect(icon).toHaveClass("h-4", "w-4");
    });
  });

  describe("접근성", () => {
    it("버튼에 적절한 aria-label이 있다", () => {
      renderWithProviders(<CreateNoteButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "create-note-button");
    });

    it("아이콘에 적절한 aria-label이 있다", () => {
      renderWithProviders(<CreateNoteButton />);

      const icon = screen.getByLabelText("create-note-button-icon");
      expect(icon).toBeInTheDocument();
    });
  });

  it("data-cy 속성이 올바르게 설정된다", () => {
    renderWithProviders(<CreateNoteButton />);

    const icon = screen.getByLabelText("create-note-button-icon");
    expect(icon).toHaveAttribute("data-cy", "create-note-button");
  });

  it("onClick prop이 없을 때도 정상적으로 렌더링된다", () => {
    renderWithProviders(<CreateNoteButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
