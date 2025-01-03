import { render, screen, fireEvent } from "@testing-library/react";
import NoteMeatballBtn from "@/app/(routes)/notes/[goalId]/components/note-meatball-btn";
import userEvent from "@testing-library/user-event";
import { expect } from "@jest/globals";
const mockRouter = { push: jest.fn() };
const mockOnOpen = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

jest.mock("@/stores/use-confirm-modal-store", () => ({
  useConfirmModal: () => ({
    onOpen: mockOnOpen,
  }),
}));

describe("NoteMeatballBtn", () => {
  const mockProps = {
    noteId: 123,
    onDelete: {
      title: "노트 삭제",
      description: "노트를 삭제하시겠습니까?",
      action: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("메뉴 버튼", () => {
    it("메뉴 버튼이 렌더링되어야 함", () => {
      render(<NoteMeatballBtn {...mockProps} />);
      expect(screen.getByRole("button", { name: "open menu" })).toBeInTheDocument();
    });

    it("메뉴 버튼에 EllipsisVertical 아이콘이 있어야 함", () => {
      render(<NoteMeatballBtn {...mockProps} />);
      const button = screen.getByRole("button", { name: "open menu" });
      expect(button.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("드롭다운 메뉴", () => {
    it("초기에는 드롭다운 메뉴가 보이지 않아야 함", () => {
      render(<NoteMeatballBtn {...mockProps} />);
      expect(screen.queryByText("수정하기")).not.toBeInTheDocument();
      expect(screen.queryByText("삭제하기")).not.toBeInTheDocument();
    });

    it("메뉴 클릭시 수정하기 옵션이 표시되어야 함", async () => {
      const user = userEvent.setup();
      render(<NoteMeatballBtn {...mockProps} />);
      await user.click(screen.getByRole("button", { name: "open menu" }));
      expect(screen.getByText("수정하기")).toBeInTheDocument();
    });

    it("메뉴 클릭시 삭제하기 옵션이 표시되어야 함", async () => {
      const user = userEvent.setup();
      render(<NoteMeatballBtn {...mockProps} />);
      await user.click(screen.getByRole("button", { name: "open menu" }));
      expect(screen.getByText("삭제하기")).toBeInTheDocument();
    });
  });

  describe("수정하기 기능", () => {
    it("수정하기 클릭시 올바른 경로로 라우팅되어야 함", async () => {
      const user = userEvent.setup();
      render(<NoteMeatballBtn {...mockProps} />);
      await user.click(screen.getByRole("button", { name: "open menu" }));
      await user.click(screen.getByRole("button", { name: "edit note" }));
      expect(mockRouter.push).toHaveBeenCalledWith(`/notes/edit/${mockProps.noteId}`);
    });
  });

  describe("삭제하기 기능", () => {
    it("삭제하기 클릭시 확인 모달이 올바른 설정으로 열려야 함", async () => {
      const user = userEvent.setup();
      render(<NoteMeatballBtn {...mockProps} />);
      await user.click(screen.getByRole("button", { name: "open menu" }));
      await user.click(screen.getByRole("button", { name: "delete note" }));
      expect(mockOnOpen).toHaveBeenCalledWith({
        title: mockProps.onDelete.title,
        description: mockProps.onDelete.description,
        confirmText: "삭제",
        variant: "danger",
        onConfirm: mockProps.onDelete.action,
      });
    });
  });
});
