import { screen, fireEvent } from "@testing-library/react";
import AppSidebarUserInfo from "@/components/shared/app-sidebar/components/app-sidebar-user-info";
import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";

const mockUser = {
  name: "Test User",
  email: "test@example.com",
};

const mockRouter = jest.fn();
const mockResetQueries = jest.fn();
const mockCreateTodo = jest.fn();
const mockOpenFormModal = jest.fn();
const mockOpenConfirm = jest.fn();
const mockLogout = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: ({ queryKey }: { queryKey: string[] }) => {
    if (queryKey[0] === "user") {
      return {
        data: mockUser,
        isError: false,
        isLoading: false,
      };
    }
    return {
      data: null,
      isError: false,
      isLoading: false,
    };
  },
  useQueryClient: () => ({
    resetQueries: mockResetQueries,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockRouter }),
}));

jest.mock("@/hooks/todo/use-todo-actions", () => ({
  useCreateTodo: () => ({
    mutate: mockCreateTodo,
  }),
}));

jest.mock("@/stores/use-form-modal-store", () => ({
  useFormModal: () => ({
    onOpen: mockOpenFormModal,
  }),
}));

jest.mock("@/stores/use-confirm-modal-store", () => ({
  useConfirmModal: () => ({
    onOpen: mockOpenConfirm,
  }),
}));

jest.mock("@/stores/use-login-store", () => ({
  useLoginStore: () => ({
    logout: mockLogout,
  }),
}));

jest.mock("@/components/shared/theme-toggle", () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle Theme</button>,
}));

describe("AppSidebarUserInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("로딩 상태", () => {
    beforeEach(() => {
      jest.spyOn(require("@tanstack/react-query"), "useQuery").mockReturnValue({ isLoading: true });
    });

    it("로딩 중일 때 Skeleton들이 표시되어야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      const skeletons = screen.getAllByTestId("skeleton");
      expect(skeletons).toHaveLength(6);
    });
  });

  describe("에러 상태", () => {
    beforeEach(() => {
      jest
        .spyOn(require("@tanstack/react-query"), "useQuery")
        .mockReturnValue({ isError: true, data: null });
    });

    it("에러 시 에러 메시지가 표시되어야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      expect(screen.getByText("사용자 정보를 불러오는데 실패했습니다.")).toBeInTheDocument();
    });
  });

  describe("정상 상태", () => {
    beforeEach(() => {
      jest.spyOn(require("@tanstack/react-query"), "useQuery").mockReturnValue({
        data: mockUser,
        isError: false,
        isLoading: false,
      });
    });

    it("사용자 정보가 표시되어야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

    it("테마 토글이 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    });

    it("로그아웃 버튼 클릭 시 확인 모달이 열려야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      const logoutButton = screen.getByText("로그아웃");
      fireEvent.click(logoutButton);

      expect(mockOpenConfirm).toHaveBeenCalledWith({
        title: "로그아웃 하시겠어요?",
        confirmText: "로그아웃",
        variant: "danger",
        onConfirm: expect.any(Function),
      });
    });

    it("로그아웃 확인 시 올바른 동작을 수행해야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      const logoutButton = screen.getByText("로그아웃");
      fireEvent.click(logoutButton);

      const onConfirm = mockOpenConfirm.mock.calls[0][0].onConfirm;
      onConfirm();

      expect(mockLogout).toHaveBeenCalled();
      expect(mockRouter).toHaveBeenCalledWith("/login");
      expect(mockResetQueries).toHaveBeenCalled();
    });

    it("새 할일 버튼 클릭 시 폼 모달이 열려야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      const newTodoButton = screen.getByText("새 할 일");
      fireEvent.click(newTodoButton);

      expect(mockOpenFormModal).toHaveBeenCalledWith({
        type: "todo",
        mode: "create",
        defaultValues: {
          id: 0,
          title: "",
          description: "",
        },
        onSubmit: expect.any(Function),
      });
    });

    it("새 할일 폼 제출 시 createTodo가 호출되어야 함", () => {
      renderWithProviders(<AppSidebarUserInfo />);

      const newTodoButton = screen.getByText("새 할 일");
      fireEvent.click(newTodoButton);

      const onSubmit = mockOpenFormModal.mock.calls[0][0].onSubmit;
      const testData = { id: 1, title: "Test Todo", description: "Test Description" };
      onSubmit(testData);

      expect(mockCreateTodo).toHaveBeenCalledWith(testData);
    });
  });
});
