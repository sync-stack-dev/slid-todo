import { renderWithProviders } from "../test-utils";
import TodosPage from "@/app/(routes)/(todos)/todos/page";
import { screen } from "@testing-library/react";
import { expect } from "@jest/globals";

jest.mock("@/hooks/todo/use-todos", () => ({
  useTodosInfinite: () => ({
    isLoading: false,
  }),
}));

describe("TodosPage", () => {
  it("로딩 중이 아닐 때 TodoList를 렌더링한다", () => {
    renderWithProviders(<TodosPage />);

    expect(screen.getByTestId("todos-page")).toBeInTheDocument();
  });

  it("로딩 중일 때 Loading 컴포넌트를 렌더링한다", () => {
    jest.spyOn(require("@/hooks/todo/use-todos"), "useTodosInfinite").mockImplementation(() => ({
      isLoading: true,
    }));

    renderWithProviders(<TodosPage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
