import { screen, fireEvent } from "@testing-library/react";
import NoteCard from "@/app/(routes)/notes/[goalId]/components/note-card";
import { renderWithProviders } from "../../../data/test-utils";
import { mockNoteList } from "../../../data/note";
import { expect } from "@jest/globals";

// useNoteActions hook mock
const mockDeleteNote = jest.fn();
jest.mock("@/hooks/note/use-note-actions", () => ({
  useNoteActions: () => ({
    deleteNote: mockDeleteNote,
  }),
}));
// router mock
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("NoteCard", () => {
  const mockNote = mockNoteList[0];
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("렌더링", () => {
    it("노트 카드가 올바른 role과 testid로 렌더링되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);
      const card = screen.getByTestId("note-card");
      expect(card).toHaveAttribute("role", "article");
    });

    it("노트 제목이 렌더링되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);
      expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    });

    it("할 일 제목이 렌더링되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);
      expect(screen.getByText(mockNote.todo.title)).toBeInTheDocument();
    });

    it("NoteList 아이콘이 렌더링되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);
      // svg가 렌더링되었는지 확인
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("TodoBadge가 렌더링되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);
      expect(screen.getByText("To do")).toBeInTheDocument();
    });
  });

  describe("상호작용", () => {
    it("카드 클릭 시 onClick 핸들러가 호출되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);
      const card = screen.getByTestId("note-card");
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe("NoteMeatballBtn", () => {
    it("올바른 props로 렌더링되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);

      // 메뉴 버튼이 렌더링되었는지 확인
      const menuButton = screen.getByRole("button", { name: "open menu" });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("스타일", () => {
    it("dark 모드 클래스가 적용되어야 함", () => {
      renderWithProviders(<NoteCard note={mockNote} onClick={mockOnClick} />);
      const card = screen.getByTestId("note-card");
      expect(card).toHaveClass("dark:bg-gray-900", "dark:border-gray-950");
    });
  });
});
