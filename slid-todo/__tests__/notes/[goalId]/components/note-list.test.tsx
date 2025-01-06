import { screen } from "@testing-library/react";
import NoteList from "@/app/(routes)/notes/[goalId]/components/note-list";
import { expect } from "@jest/globals";
import { mockNoteList } from "../../../data/note";
import { renderWithProviders } from "../../../data/test-utils";
const mockUseNoteList = jest.fn();
jest.mock("@/hooks/note/use-note", () => ({
  useNoteList: () => mockUseNoteList(),
  useNoteById: (id: number) => ({
    data: mockNoteList.find((note) => note.id === id),
    isError: false,
  }),
}));

jest.mock("@/components/shared/loading", () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

jest.mock("@/components/shared/empty-state", () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => <div data-testid="empty-state">{message}</div>,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NoteList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("로딩 상태", () => {
    it("로딩 중일 때 Loading 컴포넌트를 표시해야 함", () => {
      mockUseNoteList.mockReturnValue({ isLoading: true });
      renderWithProviders(<NoteList goalId={1} />);
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });

  describe("에러 상태", () => {
    it("에러 발생 시 에러 메시지를 표시해야 함", () => {
      mockUseNoteList.mockReturnValue({ isError: true });
      renderWithProviders(<NoteList goalId={1} />);
      expect(screen.getByText("잘못된 접근입니다.")).toBeInTheDocument();
    });

    it("goalId가 없을 때 에러 메시지를 표시해야 함", () => {
      mockUseNoteList.mockReturnValue({});
      renderWithProviders(<NoteList goalId={0} />);
      expect(screen.getByText("잘못된 접근입니다.")).toBeInTheDocument();
    });
  });

  describe("빈 상태", () => {
    it("노트가 없을 때 EmptyState를 표시해야 함", () => {
      mockUseNoteList.mockReturnValue({
        data: { notes: [] },
        isLoading: false,
        isError: false,
      });
      renderWithProviders(<NoteList goalId={1} />);
      expect(screen.getByText("아직 등록된 노트가 없어요")).toBeInTheDocument();
    });

    it("data가 없을 때 EmptyState를 표시해야 함", () => {
      mockUseNoteList.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
      });
      renderWithProviders(<NoteList goalId={1} />);
      expect(screen.getByText("아직 등록된 노트가 없어요")).toBeInTheDocument();
    });
  });

  describe("노트 목록 표시", () => {
    it("노트 목록이 있을 때 모든 노트를 렌더링해야 함", () => {
      mockUseNoteList.mockReturnValue({
        data: { notes: mockNoteList },
        isLoading: false,
        isError: false,
      });
      renderWithProviders(<NoteList goalId={1} />);

      mockNoteList.forEach((note) => {
        expect(screen.getByText(note.title)).toBeInTheDocument();
      });
    });
  });
});
