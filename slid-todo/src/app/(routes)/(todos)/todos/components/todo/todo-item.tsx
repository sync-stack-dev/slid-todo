// components/todo/todo-list/todo-item.tsx
import { Todo } from "@/actions/todo/types";
import TodoItemActions from "./todo-item-actions";
import TodoItemCheckbox from "./todo-item-checkbox";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded group">
      <TodoItemCheckbox todo={todo} />
      <span className={todo.done ? "text-gray-400" : ""}>{todo.title}</span>
      <TodoItemActions todo={todo} />
    </div>
  );
};

export default TodoItem;
