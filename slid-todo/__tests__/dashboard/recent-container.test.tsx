import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecentContainer from "@/app/(routes)/dashboard/components/recent-todo-block/recent-container";
import { useRecentTodos } from "@/hooks/todo/use-todos";
import TodoItem from "@/components/shared/todo-list/todo-item";
import EmptyState from "@/components/shared/empty-state";
import { mockTodoData, createMockTodoData } from "../data/todo"; // mockData 임포트
import { expect } from "@jest/globals";

jest.mock("@/hooks/todo/use-todos", () => ({
  useRecentTodos: jest.fn(),
}));

const queryClient = new QueryClient();

describe("RecentContainer", () => {
  it("should render EmptyState when no todos are available", async () => {
    (useRecentTodos as jest.Mock).mockReturnValue({
      data: { todos: [] },
      error: null,
      isError: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RecentContainer />
      </QueryClientProvider>,
    );

    expect(screen.getByText("최근에 등록한 할 일이 없어요")).toBeInTheDocument();
  });

  // it("should render TodoItem when todos are available", async () => {
  //   const todos = createMockTodoData([mockTodoData(1), mockTodoData(2)]);

  //   (useRecentTodos as jest.Mock).mockReturnValue({
  //     data: todos,
  //     error: null,
  //     isError: false,
  //   });

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <RecentContainer />
  //     </QueryClientProvider>,
  //   );

  //   // findByText를 사용하여 비동기적으로 텍스트가 렌더링되기를 기다림
  //   await waitFor(() => {
  //     expect(screen.getByText("Todo 1")).toBeInTheDocument();
  //     expect(screen.getByText("Todo 2")).toBeInTheDocument();
  //   });
  // });

  it("should render error message when there is an error", async () => {
    (useRecentTodos as jest.Mock).mockReturnValue({
      data: null,
      error: new Error("Test Error"),
      isError: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RecentContainer />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Error: Test Error")).toBeInTheDocument();
  });
});
