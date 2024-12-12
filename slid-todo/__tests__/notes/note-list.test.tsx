import { render, screen, waitFor } from "@testing-library/react";
import NoteList from "@/app/(routes)/notes/[goalId]/components/note-list";
import { expect } from "@jest/globals";

jest.mock("@/hooks/note/use-note", () => ({
  useNoteList: jest.fn(),
  useNoteById: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const {
  useNoteList: mockUseNoteList,
  useNoteById: mockUseNoteById,
} = require("@/hooks/note/use-note");
const { useRouter: mockUseRouter } = require("next/router");

describe("NoteList", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: { goalId: "1" },
      push: jest.fn(),
      replace: jest.fn(),
      pathname: "/notes/1",
      asPath: "/notes/1",
    });

    mockUseNoteById.mockReturnValue({
      todo: {
        id: 100,
        title: "Test todo",
        done: false,
      },
      updatedAt: "2024-12-12T12:00:00Z",
      createdAt: "2024-12-12T12:00:00Z",
      title: "Note 1",
      id: 1,
      goal: {
        id: 1,
        title: "Test goal",
      },
      userId: 123,
      teamId: "Test team",
      content: "This is a test note",
    });
  });

  it("로딩 중일 때 Loading 컴포넌트를 렌더링한다", () => {
    mockUseNoteList.mockReturnValue({ data: {}, isLoading: true, isError: false });

    render(<NoteList goalId={1} />);

    expect(screen.getByLabelText(/Loading/i)).toBeInTheDocument();
  });

  it("goalId가 없거나 에러가 발생했을 때 에러 메시지를 렌더링한다", () => {
    mockUseNoteList.mockReturnValue({ data: null, isLoading: false, isError: true });

    render(<NoteList goalId={0} />);

    expect(screen.getByText(/잘못된 접근입니다./)).toBeInTheDocument();
  });

  it("노트 데이터가 없을 때 EmptyState 컴포넌트를 렌더링한다", () => {
    mockUseNoteList.mockReturnValue({ data: { notes: [] }, isLoading: false, isError: false });

    render(<NoteList goalId={1} />);

    expect(screen.getByText(/아직 등록된 노트가 없어요/)).toBeInTheDocument();
  });

  // it("노트 데이터를 렌더링한다", async () => {
  //   const notes = [
  //     {
  //       todo: {
  //         id: 100,
  //         title: "Test todo",
  //         done: false,
  //       },
  //       updatedAt: "2024-12-12T12:00:00Z",
  //       createdAt: "2024-12-12T12:00:00Z",
  //       title: "Note 1",
  //       id: 1,
  //       goal: {
  //         id: 1,
  //         title: "Test goal",
  //       },
  //       userId: 123,
  //       teamId: "Test team",
  //       content: "This is a test note",
  //     },
  //     {
  //       todo: {
  //         id: 100,
  //         title: "Test todo",
  //         done: false,
  //       },
  //       updatedAt: "2024-12-12T12:00:00Z",
  //       createdAt: "2024-12-12T12:00:00Z",
  //       title: "Note 2",
  //       id: 2,
  //       goal: {
  //         id: 1,
  //         title: "Test goal",
  //       },
  //       userId: 123,
  //       teamId: "Test team",
  //       content: "This is a test note",
  //     },
  //   ];
  //   mockUseNoteList.mockReturnValue({ data: { notes: notes }, isLoading: false, isError: false });

  //   render(<NoteList goalId={1} />);
  //   screen.debug();

  //   const note = await screen.findByText(/Note 1/i);
  //   expect(note).toBeInTheDocument();
  // });
});
