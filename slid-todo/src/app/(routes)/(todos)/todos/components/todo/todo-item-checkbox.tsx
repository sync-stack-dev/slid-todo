import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/actions/todo/types";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";

interface TodoItemCheckboxProps {
  todo: Todo;
}

const TodoItemCheckbox = ({ todo }: TodoItemCheckboxProps) => {
  const { updateTodoDone } = useTodoActions(todo);

  const handleCheckboxChange = async (checked: boolean) => {
    const isChecked = checked === true;
    console.log("Todo status changed:", todo.id, isChecked);
    updateTodoDone(isChecked); // mutation 호출
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
