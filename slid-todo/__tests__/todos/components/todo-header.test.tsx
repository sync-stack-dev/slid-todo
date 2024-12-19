import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import TodoHeader from "@/app/(routes)/(todos)/todos/components/todo-header";
import { expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";

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
}));

describe("TodoHeader", () => {
  it("모든 할 일 총 개수를 표시한다.", () => {
    renderWithProviders(<TodoHeader totalCount={5} />);
    expect(screen.getByText("모든 할 일 (5)")).toBeInTheDocument();
  });

  it("+ 할 일 추가 버튼을 클릭하면 할 일 추가 모달이 열린다.", async () => {
    const user = userEvent.setup();

    renderWithProviders(<TodoHeader totalCount={5} />);

    const addButton = screen.getByText("+ 할 일 추가");
    await user.click(addButton);

    expect(mockOnOpen).toHaveBeenCalledWith({
      type: "todo",
      mode: "create",
      onSubmit: expect.any(Function),
    });
  });
});
