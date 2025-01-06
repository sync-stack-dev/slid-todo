import { renderHook, waitFor } from "@testing-library/react";
import { useNoteActions } from "@/hooks/note/use-note-actions";
import { instance } from "@/lib/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { expect } from "@jest/globals";
import { mockNoteData } from "../../data/note";
// Mocks
jest.mock("@/lib/axios");
jest.mock("react-hot-toast");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("useNoteActions", () => {
  let queryClient: QueryClient;
  const mockNote = mockNoteData(1).data;
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  describe("createNote", () => {
    it("성공적으로 노트를 생성한다", async () => {
      const mockResponse = { data: { id: 1, title: "Test Note" } };
      (instance.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.createNote({
        todoId: 1,
        title: "Test Note",
        content: "Test Content",
      });

      await waitFor(() => {
        expect(instance.post).toHaveBeenCalledWith("/notes", {
          todoId: 1,
          title: "Test Note",
          content: "Test Content",
        });
        expect(toast.success).toHaveBeenCalledWith("노트가 작성되었습니다.");
      });
    });

    it("제목이 없을 경우 에러를 표시한다", async () => {
      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.createNote({
        todoId: 1,
        title: "",
        content: "Test Content",
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("노트 제목을 작성해야합니다.");
      });
    });

    it("내용이 없을 경우 에러를 표시한다", async () => {
      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.createNote({
        todoId: 1,
        title: "Test Title",
        content: "",
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("노트 내용을 작성해야합니다.");
      });
    });

    it("API 호출 실패시 에러를 표시한다", async () => {
      (instance.post as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.createNote({
        todoId: 1,
        title: "Test Title",
        content: "Test Content",
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("노트 작성에 실패했습니다.");
      });
    });

    it("로컬 스토리지에서 임시 데이터를 제거한다", async () => {
      const mockResponse = { data: { id: 1, title: "Test Note" } };
      (instance.post as jest.Mock).mockResolvedValueOnce(mockResponse);
      const localStorageSpy = jest.spyOn(Storage.prototype, "removeItem");

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.createNote({
        todoId: 1,
        title: "Test Note",
        content: "Test Content",
      });

      await waitFor(() => {
        expect(localStorageSpy).toHaveBeenCalledWith("1-create-note");
      });
    });
  });

  describe("updateNote", () => {
    const mockNote = mockNoteData(1).data;

    it("성공적으로 노트를 수정한다", async () => {
      const mockResponse = { data: { id: 1, title: "Updated Title" } };
      (instance.patch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.updateNote({
        noteId: 1,
        updatedNote: {
          title: "Updated Title",
          content: "Updated Content",
        },
      });

      await waitFor(() => {
        expect(instance.patch).toHaveBeenCalledWith("/notes/1", {
          title: "Updated Title",
          content: "Updated Content",
          linkUrl: null,
        });
        expect(toast.success).toHaveBeenCalledWith("노트가 수정되었습니다.");
      });
    });

    it("제목이 없을 경우 에러를 표시한다", async () => {
      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.updateNote({
        noteId: 1,
        updatedNote: {
          title: "",
          content: "Updated Content",
        },
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("노트 제목을 작성해야합니다.");
      });
    });

    it("내용이 없을 경우 에러를 표시한다", async () => {
      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.updateNote({
        noteId: 1,
        updatedNote: {
          title: "Updated Title",
          content: "",
        },
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("노트 내용을 작성해야합니다.");
      });
    });

    it("linkUrl이 없을 경우 null로 설정된다", async () => {
      const mockResponse = { data: { id: 1, title: "Updated Title" } };
      (instance.patch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.updateNote({
        noteId: 1,
        updatedNote: {
          title: "Updated Title",
          content: "Updated Content",
        },
      });

      await waitFor(() => {
        expect(instance.patch).toHaveBeenCalledWith("/notes/1", {
          title: "Updated Title",
          content: "Updated Content",
          linkUrl: null,
        });
      });
    });

    it("로컬 스토리지에서 임시 데이터를 제거한다", async () => {
      const mockResponse = { data: { id: 1, title: "Updated Title" } };
      (instance.patch as jest.Mock).mockResolvedValueOnce(mockResponse);
      const localStorageSpy = jest.spyOn(Storage.prototype, "removeItem");

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.updateNote({
        noteId: 1,
        updatedNote: {
          title: "Updated Title",
          content: "Updated Content",
        },
      });

      await waitFor(() => {
        expect(localStorageSpy).toHaveBeenCalledWith("1-edit-note");
      });
    });
  });

  describe("deleteNote", () => {
    it("성공적으로 노트를 삭제한다", async () => {
      (instance.delete as jest.Mock).mockResolvedValueOnce({});

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.deleteNote();

      await waitFor(() => {
        expect(instance.delete).toHaveBeenCalledWith("/notes/1");
        expect(toast.success).toHaveBeenCalledWith("note가 삭제되었습니다.");
      });
    });

    it("note가 없을 경우 에러를 발생시킨다", async () => {
      const { result } = renderHook(() => useNoteActions(), { wrapper });

      result.current.deleteNote();

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("note 삭제에 실패했습니다.");
      });
    });

    it("API 호출 실패시 에러를 표시한다", async () => {
      (instance.delete as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

      const { result } = renderHook(() => useNoteActions(mockNote), { wrapper });

      result.current.deleteNote();

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("note 삭제에 실패했습니다.");
      });
    });
  });
});
