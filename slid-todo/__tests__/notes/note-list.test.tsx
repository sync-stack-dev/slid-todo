import { render, screen } from "@testing-library/react";
import NoteList from "@/app/(routes)/notes/[goalId]/components/note-list";
import { expect } from "@jest/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter as mockUseRouter } from "next/navigation";
import { mockNoteData, mockNoteList } from "../data/note";

jest.mock("@/hooks/note/use-note", () => ({
  useNoteList: jest.fn(),
  useNoteById: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const queryClient = new QueryClient();

const {
  useNoteList: mockUseNoteList,
  useNoteById: mockUseNoteById,
} = require("@/hooks/note/use-note");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NoteList", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // 구 버전 API
        removeListener: jest.fn(), // 구 버전 API
        addEventListener: jest.fn(), // 신 버전 API
        removeEventListener: jest.fn(), // 신 버전 API
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    queryClient.clear();

    (mockUseRouter as jest.Mock).mockReturnValue({
      query: { goalId: "1" },
      push: jest.fn(),
      replace: jest.fn(),
      pathname: "/notes/1",
      asPath: "/notes/1",
      prefetch: jest.fn(),
    });

    mockUseNoteById.mockImplementation((id: number) => mockNoteData(id));
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

  it("노트 데이터를 렌더링한다", async () => {
    const notes = mockNoteList;
    mockUseNoteList.mockReturnValue({ data: { notes }, isLoading: false, isError: false });

    render(
      <QueryClientProvider client={queryClient}>
        <NoteList goalId={1} />
      </QueryClientProvider>,
    );

    const note = await screen.findByText(/Note 1/i);
    expect(note).toBeInTheDocument();
  });
});
