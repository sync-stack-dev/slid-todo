import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/todo";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { devLog } from "@/utils/dev-log";
interface TodoItemCheckboxProps {
  todo: Todo;
}

const TodoItemCheckbox = ({ todo }: TodoItemCheckboxProps) => {
  const { updateTodoDone } = useTodoActions(todo);

  const handleCheckboxChange = async (checked: boolean) => {
    devLog("Todo status changed:", todo.id, checked);
    updateTodoDone(checked);
  };

  return (
    <Checkbox
      checked={todo.done}
      onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
      className="w-4 h-4"
    />
  );
};

export default TodoItemCheckbox;
