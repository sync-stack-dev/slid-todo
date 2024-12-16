"use client";

import { Button } from "@/components/ui/button";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";

interface TodoHeaderProps {
  totalCount: number;
}

const TodoHeader = ({ totalCount }: TodoHeaderProps) => {
  const { onOpen: onOpenFormModal } = useFormModal();
  const { createTodo } = useTodoActions();

  const handleOpenFormModal = () => {
    onOpenFormModal({
      type: "todo",
      mode: "create",
      onSubmit: (data) => {
        createTodo(data);
      },
    });
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg leading-7 font-pretendard-semibold">모든 할 일 ({totalCount})</h2>
      <Button
        variant="default"
        className="text-sm text-blue-600 dark:text-blue-400 font-semibold bg-transparent hover:bg-transparent "
        onClick={handleOpenFormModal}
      >
        + 할 일 추가
      </Button>
    </div>
  );
};

export default TodoHeader;
