import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuItems } from "./menu-items";
import { Todo } from "@/actions/todo/types";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";

interface MoreMenuProps {
  todo: Todo;
}

export const MoreMenu = ({ todo }: MoreMenuProps) => {
  const { deleteTodo } = useTodoActions(todo);
  const { onOpen } = useConfirmModal();

  const handleDelete = () => {
    onOpen({
      title: "정말 삭제하시겠습니까?",
      confirmText: "삭제",
      variant: "danger",
      onConfirm: deleteTodo,
    });
  };

  const handleEdit = () => {
    console.log("수정하기");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4" data-cy="more-button" />
        </Button>
      </DropdownMenuTrigger>
      <MenuItems onDelete={handleDelete} onEdit={handleEdit} />
    </DropdownMenu>
  );
};
