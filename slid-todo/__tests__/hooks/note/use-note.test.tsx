import { renderHook, waitFor } from "@testing-library/react";
import { useNoteById, useNoteWithTodo, useNoteList } from "@/hooks/note/use-note";
import { instance } from "@/lib/axios";
import { TestWrapper } from "../../data/test-utils";
import { expect } from "@jest/globals";
// Mock axios instance
jest.mock("@/lib/axios", () => ({
  instance: {
    get: jest.fn(),
  },
}));

const mockNote = {
  id: 1,
  title: "Test Note",
  content: "Test Content",
  todo: {
    id: 1,
    title: "Test Todo",
    description: "Test Description",
  },
  goal: { id: 1, title: "Test Goal" },
  userId: 1,
  teamId: 1,
  updatedAt: "2024-01-01",
  createdAt: "2024-01-01",
};

const mockNotesList = {
  content: [mockNote],
  totalElements: 1,
  totalPages: 1,
  size: 40,
  number: 0,
};

describe("Note Hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useNoteById", () => {
    it("성공적으로 노트를 가져와야 함", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockNote });

      const { result } = renderHook(() => useNoteById(1), {
        wrapper: TestWrapper,
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockNote);
      expect(instance.get).toHaveBeenCalledWith("/notes/1");
    });

    it("에러 처리가 되어야 함", async () => {
      const error = new Error("Failed to fetch note");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useNoteById(1), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });

  describe("useNoteWithTodo", () => {
    it("노트와 투두 데이터를 올바르게 변환해야 함", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockNote });

      const { result } = renderHook(() => useNoteWithTodo(1), {
        wrapper: TestWrapper,
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.note).toEqual(mockNote);
      expect(result.current.todo).toEqual({
        ...mockNote.todo,
        goal: mockNote.goal,
        userId: mockNote.userId,
        teamId: mockNote.teamId,
        updatedAt: mockNote.updatedAt,
        createdAt: mockNote.createdAt,
      });
    });

    it("노트가 없을 때 todo가 null이어야 함", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const { result } = renderHook(() => useNoteWithTodo(1), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.todo).toBeNull();
    });
  });

  describe("useNoteList", () => {
    it("노트 리스트를 성공적으로 가져와야 함", async () => {
      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockNotesList });

      const { result } = renderHook(() => useNoteList(1), {
        wrapper: TestWrapper,
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockNotesList);
      expect(instance.get).toHaveBeenCalledWith("/notes", {
        params: {
          goalId: 1,
          size: 40,
        },
      });
    });

    it("에러 처리가 되어야 함", async () => {
      const error = new Error("Failed to fetch notes list");
      (instance.get as jest.Mock).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useNoteList(1), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });
});
