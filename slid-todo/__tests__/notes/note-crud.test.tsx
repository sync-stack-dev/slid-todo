import { renderHook, act } from "@testing-library/react";
import { useNoteActions } from "@/hooks/note/use-note-actions";
import { expect } from "@jest/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { instance } from "@/lib/axios";

jest.mock("@/lib/axios", () => ({
  instance: {
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

jest.mock("react-hot-toast");

const mockRouter = { back: jest.fn() };
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

const queryClient = new QueryClient();

describe("useNoteActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a note successfully", async () => {
    const mockNote = { id: 1, todoId: 1, title: "Test Note", content: "Content" };
    (instance.post as jest.Mock).mockResolvedValueOnce({ data: mockNote });

    const { result } = renderHook(() => useNoteActions(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await act(async () => {
      await result.current.createNote({ todoId: 1, title: "Test Note", content: "Content" });
    });

    expect(instance.post).toHaveBeenCalledWith("/notes", {
      todoId: 1,
      title: "Test Note",
      content: "Content",
    });
    expect(toast.success).toHaveBeenCalledWith("노트가 작성되었습니다.");
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
