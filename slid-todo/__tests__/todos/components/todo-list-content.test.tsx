import { screen } from "@testing-library/react";
import { TodoListContent } from "@/app/(routes)/(todos)/todos/components/todo-list-content";
import { Todo } from "@/types/todo";
import { renderWithProviders } from "../../test-wrapper";
import { expect } from "@jest/globals";
import { mockTodoData, createMockTodoData } from "../../data/todo";
// 타입 정의
interface TodoPage {
  todos: Todo[];
  totalCount: number;
}

interface TodoData {
  pages: TodoPage[];
  pageParams: any[];
}

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/todos",
}));

jest.mock("@/hooks/todo/use-todos", () => ({
  useDeleteTodo: () => ({
    mutate: jest.fn(),
  }),
  useUpdateTodo: () => ({
    mutate: jest.fn(),
  }),
  useTodosInfinite: () => ({
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
  }),
}));

jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: false,
  }),
}));

describe("Todo List Content", () => {
  const mockData = createMockTodoData([mockTodoData(1), mockTodoData(2)]);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 투두를 렌더링한다.", () => {
    renderWithProviders(<TodoListContent data={mockData} activeTab="all" />);

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("필터링이 잘 동작한다", () => {
    renderWithProviders(<TodoListContent data={mockData} activeTab="done" />);

    expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("데이터가 없을 때 빈 상태를 표시한다", () => {
    const emptyData: TodoData = {
      pages: [
        {
          todos: [],
          totalCount: 0,
        },
      ],
      pageParams: [null],
    };

    renderWithProviders(<TodoListContent data={emptyData} activeTab="all" />);

    expect(screen.getByText("등록된 일이 없어요")).toBeInTheDocument();
  });
});
