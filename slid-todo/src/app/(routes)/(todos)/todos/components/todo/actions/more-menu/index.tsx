import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuItems } from "./menu-items";
import { Todo } from "@/actions/todo/types";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { useFormModal } from "@/stores/use-form-modal-store";
interface MoreMenuProps {
  todo: Todo;
}

export const MoreMenu = ({ todo }: MoreMenuProps) => {
  const { deleteTodo } = useTodoActions(todo);
  const { onOpen } = useConfirmModal();
  const { onOpen: onOpenFormModal } = useFormModal();

  const handleDelete = () => {
    onOpen({
      title: `할 일을 삭제하시겠어요?`,
      description: "삭제한 할 일은 복구할 수 없습니다.",
      confirmText: "삭제",
      variant: "danger",
      onConfirm: deleteTodo,
    });
  };

  const handleEdit = () => {
    onOpenFormModal({
      type: "todo",
      mode: "edit",
      defaultValues: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        done: todo.done,
        file: todo.fileUrl,
        link: todo.linkUrl,
        goal: todo.goal,
      },
      onSubmit: (data) => console.log(data),
    });
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
