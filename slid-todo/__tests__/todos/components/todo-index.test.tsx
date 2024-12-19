import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import TodoList from "@/app/(routes)/(todos)/todos/components";
import { mockTodoData, createMockTodoData } from "../../data/todo";
import userEvent from "@testing-library/user-event";
import { expect } from "@jest/globals";

// useTodosInfinite
const mockUseTodosInfinite = jest.fn(() => ({
  data: createMockTodoData([mockTodoData(1), mockTodoData(2)]),
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
}));
jest.mock("@/hooks/todo/use-todos", () => ({
  useTodosInfinite: () => mockUseTodosInfinite(),
}));
// FormModal store
const mockOnOpen = jest.fn();
jest.mock("@/stores/use-form-modal-store", () => ({
  useFormModal: () => ({
    onOpen: mockOnOpen,
  }),
}));
// next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/todos",
}));
// react-intersection-observer
jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: false,
  }),
}));
// ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
describe("TodoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodosInfinite.mockClear();
  });

  it("초기 렌더링 시 전체 할 일이 표시된다.", () => {
    renderWithProviders(<TodoList />);

    // 헤더의 갯수를 확인하자
    expect(screen.getByText("모든 할 일 (2)")).toBeInTheDocument();
    // 모든 할 일 목록을 확인하자
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("탭 변경 시 필터링 된 할 일이 표시된다.", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TodoList />);
    // 전체 탭을 클릭하면 전체 할 일이 표시된다.
    const allTab = screen.getByText("All");
    await user.click(allTab);
    // 전체 할 일 목록을 확인하자
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();

    // 완료 탭을 클릭하면 완료 할 일이 표시된다.
    const doneTab = screen.getByText("Done");
    await user.click(doneTab);
    // 완료 할 일 목록을 확인하자 id가 짝수인 할 일이 표시된다. (Todo 2)
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("+ 할 일 추가 버튼을 클릭하면 할 일 추가 모달이 열린다.", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TodoList />);
    // + 할 일 추가 버튼을 클릭하면 할 일 추가 모달이 열린다.
    const addButton = screen.getByText("+ 할 일 추가");
    await user.click(addButton);

    // 할 일 추가 모달이 열린다.
    expect(mockOnOpen).toHaveBeenCalledWith({
      type: "todo",
      mode: "create",
      onSubmit: expect.any(Function),
    });
  });

  it("데이터가 없을 때 빈 상태가 표시된다", () => {
    // mock 구현 변경하기
    mockUseTodosInfinite.mockReturnValueOnce({
      data: createMockTodoData([]),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    renderWithProviders(<TodoList />);

    expect(screen.getByText("등록된 일이 없어요")).toBeInTheDocument();
  });

  it("데이터가 undefined일 때 totalCount가 0으로 표시된다.", () => {
    mockUseTodosInfinite.mockReturnValueOnce({
      data: createMockTodoData([]),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    renderWithProviders(<TodoList />);

    expect(screen.getByText("모든 할 일 (0)")).toBeInTheDocument();
  });

  it("To do 탭을 클릭하면 미완료된 할 일만 표시된다.", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TodoList />);

    const toDoTab = screen.getByText("To do");
    await user.click(toDoTab);
    // 미완료된 할 일만 표시된다. (Todo 2번은 완료된 할 일이다.)
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Todo 2")).not.toBeInTheDocument();
  });

  it("탭 변경 시 activeTab 상태가 업데이트된다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TodoList />);

    // 초기에는 All 탭이 활성화되어 있는지 확인
    expect(screen.getByText("All")).toHaveAttribute("data-state", "active");

    // Done 탭 클릭
    const doneTab = screen.getByText("Done");
    await user.click(doneTab);

    // Done 탭이 활성화되었는지 확인
    expect(doneTab).toHaveAttribute("data-state", "active");

    // 다른 탭들은 비활성화되었는지 확인
    expect(screen.getByText("All")).toHaveAttribute("data-state", "inactive");
    expect(screen.getByText("To do")).toHaveAttribute("data-state", "inactive");
  });
});
