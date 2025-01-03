import { screen, fireEvent } from "@testing-library/react";
import { NoteButton } from "@/components/shared/action-buttons/note-button";
import { expect } from "@jest/globals";
import { renderWithProviders } from "../../data/test-utils";

describe("NoteButton", () => {
  it("버튼이 렌더링된다", () => {
    renderWithProviders(<NoteButton />);

    const button = screen.getByRole("button", { name: "note-button" });
    expect(button).toBeInTheDocument();
  });

  it("아이콘이 렌더링된다", () => {
    renderWithProviders(<NoteButton />);

    const icon = screen.getByLabelText("note-button-icon");
    expect(icon).toBeInTheDocument();
  });

  it("클릭 시 onClick 핸들러가 호출된다", () => {
    const handleClick = jest.fn();
    renderWithProviders(<NoteButton onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("버튼에 올바른 스타일이 적용된다", () => {
    renderWithProviders(<NoteButton />);

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

  it("아이콘에 올바른 색상이 적용된다", () => {
    renderWithProviders(<NoteButton />);

    const icon = screen.getByLabelText("note-button-icon");
    expect(icon).toHaveClass("text-blue-400");
  });
});
