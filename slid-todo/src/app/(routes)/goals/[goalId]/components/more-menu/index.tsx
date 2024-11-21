"use client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuItems } from "./menu-items";
import { Goal } from "@/actions/goal/types";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { useGoalActions } from "@/hooks/goals/use-goal-actions";
import { useFormModal } from "@/stores/use-form-modal-store";

interface MoreMenuProps {
  goal: Goal;
}

export const MoreMenu = ({ goal }: MoreMenuProps) => {
  const { onOpen } = useConfirmModal();
  const { onOpen: onOpenFormModal } = useFormModal();
  const { deleteGoal, updateGoal } = useGoalActions(goal);

  const handleDelete = () => {
    onOpen({
      title: "목표를 삭제하시겠어요?",
      description: "삭제한 목표는 복구할 수 없습니다.",
      confirmText: "삭제",
      variant: "danger",
      onConfirm: () => {
        console.log("Deleting goal:", goal.id);
        deleteGoal();
      },
    });
  };

  const handleEdit = () => {
    onOpenFormModal({
      type: "goal",
      mode: "edit",
      defaultValues: {
        id: goal.id,
        title: goal.title,
      },
      onSubmit: async (data) => {
        try {
          await updateGoal(data.title);
        } catch (error) {
          console.error("목표 수정 실패:", error);
        }
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <MenuItems onDelete={handleDelete} onEdit={handleEdit} />
    </DropdownMenu>
  );
};
