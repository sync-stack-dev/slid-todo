// import { render, screen, fireEvent } from "@testing-library/react";
// import NoteCardAction from "@/app/(routes)/notes/[goalId]/components/note-card-action";
// import { useNoteById } from "@/hooks/note/use-note";
// import { expect } from "@jest/globals";
// import { mockNoteData } from "../data/note";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useRouter as mockUseRouter } from "next/navigation";

// const queryClient = new QueryClient();

// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
// }));

// jest.mock("@/hooks/note/use-note", () => ({
//   useNoteById: jest.fn(),
// }));

// jest.mock("@/components/shared/loading", () => ({
//   Loading: () => <div>Loading...</div>,
// }));
// const mockNote = mockNoteData(1);

// const { useNoteById: mockUseNoteById } = require("@/hooks/note/use-note");

// describe("NoteCardAction", () => {
//   beforeEach(() => {
//     queryClient.clear();

//     (mockUseRouter as jest.Mock).mockReturnValue({
//       query: { goalId: "1" },
//       push: jest.fn(),
//       replace: jest.fn(),
//       pathname: "/notes/1",
//       asPath: "/notes/1",
//       prefetch: jest.fn(),
//     });

//     mockUseNoteById.mockImplementation((id: number) => mockNoteData(id));
//   });

//   it("renders loading state", () => {
//     (useNoteById as jest.Mock).mockReturnValue({
//       data: null,
//       isLoading: true,
//       isError: false,
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <NoteCardAction note={mockNote} />
//       </QueryClientProvider>,
//     );

//     // 로딩 텍스트가 표시되는지 확인
//     expect(screen.getByText("Loading...")).toBeInTheDocument();
//   });

//   it("renders error state", () => {
//     (useNoteById as jest.Mock).mockReturnValue({
//       data: null,
//       isLoading: false,
//       isError: true,
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <NoteCardAction note={mockNote} />
//       </QueryClientProvider>,
//     );

//     // 에러 처리에서 null이 반환되므로 아무것도 렌더링되지 않음
//     expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
//     expect(screen.queryByText("Note Viewer")).not.toBeInTheDocument();
//   });

//   it("renders NoteViewer when the note is loaded", () => {
//     (useNoteById as jest.Mock).mockReturnValue({
//       data: mockNoteData(1),
//       isLoading: false,
//       isError: false,
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <NoteCardAction note={mockNote} />
//       </QueryClientProvider>,
//     );

//     fireEvent.click(screen.getByText("Test Todo"));
//     expect(screen.getByText("This is a test note.")).toBeInTheDocument();
//   });

//   it("opens NoteViewer on NoteCard click", () => {
//     const mockNoteData = {
//       title: "Test Note",
//       content: "This is a test note.",
//     };

//     (useNoteById as jest.Mock).mockReturnValue({
//       data: mockNoteData,
//       isLoading: false,
//       isError: false,
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <NoteCardAction note={mockNote} />
//       </QueryClientProvider>,
//     );

//     // NoteCard 클릭하여 NoteViewer가 열리는지 확인
//     const noteCard = screen.getByText("Test Todo");
//     fireEvent.click(noteCard);

//     // NoteViewer가 열리고 내용이 표시되는지 확인
//     expect(screen.getByText("This is a test note.")).toBeInTheDocument();
//   });
// });
