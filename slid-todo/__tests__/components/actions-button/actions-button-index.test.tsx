import { renderWithProviders } from "../../data/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { ActionButtons } from "@/components/shared/action-buttons";
import { expect } from "@jest/globals";
describe("ActionButtons", () => {
  const mockProps = {
    linkUrl: "https://example.com",
    fileUrl: "https://example.com/file.pdf",
    onNoteClick: jest.fn(),
    onCreateNote: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("노트 버튼 렌더링", () => {
    it("hasNote가 true일 때 NoteButton을 렌더링한다", () => {
      renderWithProviders(<ActionButtons {...mockProps} hasNote={true} />);

      const noteButton = screen.getByLabelText("note-button");
      expect(noteButton).toBeInTheDocument();
      expect(screen.queryByLabelText("create-note-button")).not.toBeInTheDocument();
    });

    it("hasNote가 false일 때 CreateNoteButton을 렌더링한다", () => {
      renderWithProviders(<ActionButtons {...mockProps} hasNote={false} />);

      const createNoteButton = screen.getByLabelText("create-note-button");
      expect(createNoteButton).toBeInTheDocument();
      expect(screen.queryByLabelText("note-button")).not.toBeInTheDocument();
    });

    it("hasNote가 false일 때 버튼이 기본적으로 숨겨져 있다", () => {
      renderWithProviders(<ActionButtons {...mockProps} hasNote={false} />);

      const container = screen.getByLabelText("create-note-button").closest("div");
      expect(container).toHaveClass("opacity-0", "group-hover:opacity-100", "transition-opacity");
    });

    it("hasNote가 true일 때 버튼이 항상 보인다", () => {
      renderWithProviders(<ActionButtons {...mockProps} hasNote={true} />);

      const container = screen.getByLabelText("note-button").closest("div");
      expect(container).not.toHaveClass("opacity-0", "group-hover:opacity-100");
    });
  });

  describe("링크 버튼", () => {
    it("linkUrl이 제공되면 LinkButton을 렌더링한다", () => {
      renderWithProviders(<ActionButtons linkUrl="https://example.com" />);

      const linkButton = screen.getByTestId("link-button");
      expect(linkButton).toBeInTheDocument();
    });

    it("linkUrl이 없으면 LinkButton을 렌더링하지 않는다", () => {
      renderWithProviders(<ActionButtons />);

      expect(screen.queryByTestId("link-button")).not.toBeInTheDocument();
    });
  });

  describe("파일 버튼", () => {
    it("fileUrl이 제공되면 FileButton을 렌더링한다", () => {
      renderWithProviders(<ActionButtons fileUrl="https://example.com/file.pdf" />);

      const fileButton = screen.getByTestId("file-button");
      expect(fileButton).toBeInTheDocument();
    });

    it("fileUrl이 없으면 FileButton을 렌더링하지 않는다", () => {
      renderWithProviders(<ActionButtons />);

      expect(screen.queryByTestId("file-button")).not.toBeInTheDocument();
    });
  });

  describe("클릭 이벤트", () => {
    it("NoteButton 클릭 시 onNoteClick이 호출된다", () => {
      renderWithProviders(<ActionButtons {...mockProps} hasNote={true} />);

      const noteButton = screen.getByLabelText("note-button");
      fireEvent.click(noteButton);

      expect(mockProps.onNoteClick).toHaveBeenCalledTimes(1);
    });

    it("CreateNoteButton 클릭 시 onCreateNote가 호출된다", () => {
      renderWithProviders(<ActionButtons {...mockProps} hasNote={false} />);

      const createNoteButton = screen.getByLabelText("create-note-button");
      fireEvent.click(createNoteButton);

      expect(mockProps.onCreateNote).toHaveBeenCalledTimes(1);
    });
  });

  describe("선택적 props", () => {
    it("onClick 핸들러 없이도 렌더링된다", () => {
      renderWithProviders(<ActionButtons linkUrl="https://example.com" />);

      expect(screen.getByTestId("link-button")).toBeInTheDocument();
    });

    it("모든 props가 없을 때도 렌더링된다", () => {
      renderWithProviders(<ActionButtons />);

      const createNoteButton = screen.getByLabelText("create-note-button");
      expect(createNoteButton).toBeInTheDocument();

      const container = createNoteButton.closest(".flex.items-center.gap-2");
      expect(container).toBeInTheDocument();
    });
  });
});
