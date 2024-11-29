import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/todo";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";

interface TodoItemCheckboxProps {
  todo: Todo;
}

const TodoItemCheckbox = ({ todo }: TodoItemCheckboxProps) => {
  const { updateTodoDone } = useTodoActions(todo);

  const handleCheckboxChange = async (checked: boolean) => {
    console.log("Todo status changed:", todo.id, checked);
    updateTodoDone(checked);
  };

  return (
    <Checkbox
      checked={todo.done}
      onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
      className="w-4 h-4 border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
    />
  );
};

export default TodoItemCheckbox;
