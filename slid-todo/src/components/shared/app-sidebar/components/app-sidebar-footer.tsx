"use client";
import { Button } from "@/components/ui/button";
import { useGoalActions } from "@/hooks/goals/use-goal-actions";
import { useFormModal } from "@/stores/use-form-modal-store";
import { Plus } from "lucide-react";

export const AppSidebarFooter = () => {
  const { onOpen: onOpenFormModal } = useFormModal();
  const { createGoal } = useGoalActions();

  const handleOpenFormModal = () => {
    onOpenFormModal({
      type: "goal",
      mode: "create",
      onSubmit: (data) => {
        createGoal(data);
      },
    });
  };

  return (
    <div className="flex justify-between items-center px-5 py-2 flex-col">
      <Button
        onClick={handleOpenFormModal}
        className="w-full text-blue-500 text-base bg-white hover:bg-blue-300 dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700"
        data-cy="create-goal-button"
      >
        <Plus />
        <span>새 목표</span>
      </Button>
    </div>
  );
};
