import { getFilteredTodos } from "@/app/(routes)/(todos)/todos/components/utils";
import { expect } from "@jest/globals";
import { mockTodoData } from "../../data/todo";

describe("getFilteredTodos", () => {
  const mockTodos = [
    mockTodoData(1),
    mockTodoData(2),
    mockTodoData(3),
    mockTodoData(4),
    mockTodoData(5),
  ];
  it("모든 투두를 반환한다.", () => {
    const result = getFilteredTodos(mockTodos, "all");
    expect(result).toHaveLength(5);
  });

  it("완료되지 않은 투두만 반환한다.", () => {
    const result = getFilteredTodos(mockTodos, "todo");
    expect(result.every((todo) => !todo.done)).toBe(true);
  });

  it("완료된 투두만 반환한다.", () => {
    const result = getFilteredTodos(mockTodos, "done");
    expect(result.every((todo) => todo.done)).toBe(true);
  });

  it("잘못된 탭을 선택했을 때 모든 투두를 반환한다.", () => {
    // @ts-expect-error - 일부러 잘못된 값 전달을 위한 ignore
    const result = getFilteredTodos(mockTodos, "wrong");
    expect(result).toHaveLength(5);
  });
});
