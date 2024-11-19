import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/actions/todo/types";

interface TodoItemCheckboxProps {
  todo: Todo;
}

const TodoItemCheckbox = ({ todo }: TodoItemCheckboxProps) => {
  const handleCheckboxChange = async (checked: boolean) => {
    console.log("Todo status changed:", todo.id, checked);
    // TODO: 상태 변경 로직 구현
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
