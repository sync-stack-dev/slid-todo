import { renderWithProviders } from "../data/test-utils";
import TodosPage from "@/app/(routes)/(todos)/todos/page";
import { screen, act } from "@testing-library/react";
import { expect } from "@jest/globals";
jest.mock("@/hooks/todo/use-todos", () => ({
  useTodosInfinite: () => ({
    isLoading: false,
  }),
}));

describe("TodosPage", () => {
  it("로딩 중이 아닐 때 TodoList를 렌더링한다", async () => {
    await act(async () => {
      renderWithProviders(<TodosPage />);
    });

    expect(screen.getByTestId("todos-page")).toBeInTheDocument();
  });

  it("로딩 중일 때 Loading 컴포넌트를 렌더링한다", async () => {
    jest.spyOn(require("@/hooks/todo/use-todos"), "useTodosInfinite").mockImplementation(() => ({
      isLoading: true,
    }));

    await act(async () => {
      renderWithProviders(<TodosPage />);
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
