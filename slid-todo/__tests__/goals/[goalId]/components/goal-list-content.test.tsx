import GoalListContent from "@/app/(routes)/goals/[goalId]/components/goal-list-content";
import { renderWithProviders } from "../../../data/test-utils";
import { expect } from "@jest/globals";
import { TodoListContent } from "@/app/(routes)/(todos)/todos/components/todo-list-content";
import { useGoalTodosInfinite } from "@/hooks/goals/use-goal-todos";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useCreateTodo } from "@/hooks/todo/use-todo-actions";
import { userEvent } from "@testing-library/user-event";
import { act, fireEvent, getByText, render, screen } from "@testing-library/react";
import { createMockTodoData, mockTodoData, mockTodoList } from "../../../data/todo";

jest.mock("@/hooks/goals/use-goal-todos", () => ({
  useGoalTodosInfinite: () => ({
    isLoading: false,
  }),
}));
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    goalId: "1",
  }),
}));

jest.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: jest.fn(), inView: false }),
}));

const mockOnOpen = jest.fn();
jest.mock("@/stores/use-form-modal-store", () => ({
  useFormModal: () => ({
    onOpen: mockOnOpen,
  }),
}));

jest.mock("@/hooks/todo/use-todo-actions", () => ({
  useCreateTodo: () => ({
    mutate: jest.fn(),
  }),
  useUpdateTodoDone: () => ({
    mutate: jest.fn(),
  }),
  useDeleteTodo: () => ({
    mutate: jest.fn(),
  }),
  useUpdateTodo: () => ({
    mutate: jest.fn(),
  }),
}));

describe("Goal List Content", () => {
  it("로딩 중일 때 null을 반환한다", () => {
    jest
      .spyOn(require("@/hooks/goals/use-goal-todos"), "useGoalTodosInfinite")
      .mockImplementation(() => ({
        isLoading: true,
      }));

    const { container } = render(<GoalListContent />);

    expect(container.firstChild).toBeNull();
  });

  describe("데이터 로딩", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Todo 목록을 올바르게 렌더링한다", () => {
      const mockTodos = mockTodoList.filter((todo) => !todo.done);
      const mockData = createMockTodoData(mockTodos);

      jest
        .spyOn(require("@/hooks/goals/use-goal-todos"), "useGoalTodosInfinite")
        .mockImplementation((_, isDone = false) => ({
          isLoading: false,
          isFetchingNextPage: false,
          data: isDone ? createMockTodoData([]) : mockData,
          hasNextPage: false,
          fetchNextPage: jest.fn(),
        }));

      const { getByText } = renderWithProviders(<GoalListContent />);

      // Todo 섹션 확인
      expect(getByText("Todo")).toBeInTheDocument();

      mockTodos.forEach((todo) => {
        expect(getByText(todo.title)).toBeInTheDocument();
      });
    });

    it("Done 목록을 올바르게 렌더링한다", () => {
      const mockDoneTodos = mockTodoList.filter((todo) => todo.done);
      const mockData = createMockTodoData(mockDoneTodos);

      jest
        .spyOn(require("@/hooks/goals/use-goal-todos"), "useGoalTodosInfinite")
        .mockImplementation((_, isDone = false) => ({
          isLoading: false,
          isFetchingNextPage: false,
          data: isDone ? mockData : createMockTodoData([]),
          hasNextPage: false,
          fetchNextPage: jest.fn(),
        }));

      const { getByText } = renderWithProviders(<GoalListContent />);

      expect(getByText("Done")).toBeInTheDocument();

      mockDoneTodos.forEach((todo) => {
        expect(getByText(todo.title)).toBeInTheDocument();
      });
    });
  });
  describe("할 일 추가", () => {
    const mockCreateTodo = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      jest
        .spyOn(require("@/hooks/todo/use-todo-actions"), "useCreateTodo")
        .mockImplementation(() => ({
          mutate: mockCreateTodo,
        }));
    });

    it("버튼 클릭 시 모달이 올바른 파라미터로 열린다", () => {
      const { getByRole } = renderWithProviders(<GoalListContent />);

      const addButton = getByRole("button", { name: /할 일 추가/i });
      fireEvent.click(addButton);

      expect(mockOnOpen).toHaveBeenCalledWith({
        type: "todo",
        mode: "create",
        defaultValues: {
          id: 0,
          title: "",
          goal: {
            id: 1,
            title: "",
          },
        },
        onSubmit: expect.any(Function),
      });
    });

    it("모달 onSubmit 호출 시 createTodo가 호출된다", () => {
      const { getByRole } = renderWithProviders(<GoalListContent />);

      const addButton = getByRole("button", { name: /할 일 추가/i });
      fireEvent.click(addButton);

      const modalConfig = mockOnOpen.mock.calls[0][0];

      const testData = { title: "새로운 할일" };
      modalConfig.onSubmit(testData);

      expect(mockCreateTodo).toHaveBeenCalledWith(testData);
    });
  });
});
