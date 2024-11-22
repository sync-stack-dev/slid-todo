import { Todo } from "@/actions/todo/types";
import TodoActions from "./actions";
import TodoItemCheckbox from "./todo-item-checkbox";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded group animate-fade-in-up">
      <TodoItemCheckbox todo={todo} />
      <span className={todo.done ? "text-gray-400" : ""}>{todo.title}</span>
      <TodoActions todo={todo} />
    </div>
  );
};

export default TodoItem;
