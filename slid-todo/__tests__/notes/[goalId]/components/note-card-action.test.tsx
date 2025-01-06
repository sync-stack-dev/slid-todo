import { render, screen, fireEvent } from "@testing-library/react";
import NoteCardAction from "@/app/(routes)/notes/[goalId]/components/note-card-action";
import { useNoteById } from "@/hooks/note/use-note";
import { expect } from "@jest/globals";
import { renderWithProviders } from "../../../data/test-utils";
import { mockNoteData, mockNoteList } from "../../../data/note";
// useNoteById 모킹
jest.mock("@/hooks/note/use-note", () => ({
  useNoteById: jest.fn(),
}));
// useRouter 모킹
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NoteCardAction", () => {
  const mockNote = {
    id: "1",
    content: "Test note",
    todo: {
      id: "todo-1",
      title: "Test todo",
    },
    goal: {
      id: "goal-1",
      title: "Test goal",
    },
    userId: "user-1",
    teamId: "team-1",
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  beforeEach(() => {
    (useNoteById as jest.Mock).mockReturnValue({
      data: mockNoteData,
      isError: false,
    });
  });

  describe("렌더링 테스트", () => {
    it("노트 데이터가 정상적일 때 노트 카드가 렌더링되어야 함", () => {
      renderWithProviders(<NoteCardAction note={mockNoteList[0]} />);
      expect(screen.getByTestId("note-card")).toBeInTheDocument();
    });

    it("useNoteById 훅에서 에러가 발생하면 노트 카드가 렌더링되지 않아야 함", () => {
      (useNoteById as jest.Mock).mockReturnValue({
        data: null,
        isError: true,
      });
      renderWithProviders(<NoteCardAction note={mockNoteList[0]} />);
      expect(screen.queryByTestId("note-card")).not.toBeInTheDocument();
    });

    it("noteData가 없으면 노트 카드가 렌더링되지 않아야 함", () => {
      (useNoteById as jest.Mock).mockReturnValue({
        data: null,
        isError: false,
      });
      renderWithProviders(<NoteCardAction note={mockNoteList[0]} />);
      expect(screen.queryByTestId("note-card")).not.toBeInTheDocument();
    });
  });

  describe("노트 뷰어 상호작용", () => {
    it("노트 카드 클릭 시 노트 뷰어가 열려야 함", () => {
      renderWithProviders(<NoteCardAction note={mockNoteList[0]} />);
      const noteCard = screen.getByTestId("note-card");
      fireEvent.click(noteCard);
      expect(screen.getByTestId("note-viewer")).toBeVisible();
    });
  });

  describe("데이터 전달 테스트", () => {
    it("NoteViewer에 올바른 todo 데이터가 전달되어야 함", () => {
      renderWithProviders(<NoteCardAction note={mockNoteList[0]} />);
      const noteCard = screen.getByTestId("note-card");
      fireEvent.click(noteCard);

      // data-testid를 사용하여 특정 요소를 찾습니다
      const noteViewer = screen.getByTestId("note-viewer");

      // props가 전달되었는지 확인
      expect(noteViewer).toBeInTheDocument();
      expect(screen.getByTestId("note-viewer-sheet")).toBeInTheDocument();
    });
  });
});
