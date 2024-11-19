import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuItems } from "./menu-items";
import { Todo } from "@/actions/todo/types";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";

interface MoreMenuProps {
  todo: Todo;
}

export const MoreMenu = ({ todo }: MoreMenuProps) => {
  const { deleteTodo } = useTodoActions(todo);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteTodo();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4" data-cy="more-button" />
        </Button>
      </DropdownMenuTrigger>
      <MenuItems onDelete={handleDelete} />
    </DropdownMenu>
  );
};
