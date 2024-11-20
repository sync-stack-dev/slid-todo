"use client";
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
  const { deleteTodo, updateTodo } = useTodoActions(todo);
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
        description: todo.description || "",
        done: todo.done,
        file: todo.fileUrl || "", // fileUrl을 file로 매핑
        link: todo.linkUrl || "", // linkUrl을 link로 매핑
        goal: todo.goal
          ? {
              id: todo.goal.id,
              title: todo.goal.title,
            }
          : undefined,
      },
      onSubmit: async (data) => {
        try {
          // FormModal에서 받은 데이터를 Todo 형식으로 변환
          await updateTodo({
            ...todo,
            title: data.title,
            description: data.description,
            done: data.done,
            fileUrl: data.file, // file을 fileUrl로 다시 매핑
            linkUrl: data.link, // link를 linkUrl로 다시 매핑
            goal: data.goal,
          });
        } catch (error) {
          console.error("할 일 수정 실패:", error);
        }
      },
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
