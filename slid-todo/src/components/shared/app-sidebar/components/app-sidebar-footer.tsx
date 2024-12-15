"use client";
import { Button } from "@/components/ui/button";
import { useGoalActions } from "@/hooks/goals/use-goal-actions";
import { useGoals } from "@/hooks/goals/use-goals";
import { useFormModal } from "@/stores/use-form-modal-store";
import { Plus } from "lucide-react";
import Skeleton from "@/components/shared/skeleton";
export const AppSidebarFooter = () => {
  const { onOpen: onOpenFormModal } = useFormModal();
  const { createGoal } = useGoalActions();
  const { isLoading } = useGoals(); // 목표 데이터 로딩 상태 사용

  const handleOpenFormModal = () => {
    onOpenFormModal({
      type: "goal",
      mode: "create",
      onSubmit: (data) => {
        createGoal(data);
      },
    });
  };
  if (isLoading) {
    return (
      <div className="flex justify-between items-center px-5 py-2 flex-col">
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-5 py-4 flex-col">
      <Button
        onClick={handleOpenFormModal}
        className="flex items-center justify-center w-full text-blue-500 text-base bg-white hover:bg-blue-300 dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700"
        data-cy="create-goal-button"
      >
        <Plus />
        <span>새 목표</span>
      </Button>
    </div>
  );
};
