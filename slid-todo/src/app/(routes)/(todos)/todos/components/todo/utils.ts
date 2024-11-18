// components/todo/todo-list/utils.ts
import { Todo } from "@/actions/todo/types";

export type TabType = "all" | "todo" | "done";

export const getFilteredTodos = (todos: Todo[], tab: TabType): Todo[] => {
  const doneTodos = todos.filter((todo) => todo.done);
  const undoneTodos = todos.filter((todo) => !todo.done);

  switch (tab) {
    case "all":
      return todos;
    case "todo":
      return undoneTodos;
    case "done":
      return doneTodos;
    default:
      return todos;
  }
};
