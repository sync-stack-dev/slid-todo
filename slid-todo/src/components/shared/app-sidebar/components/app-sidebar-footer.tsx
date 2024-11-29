import { Button } from "@/components/ui/button";
import { useGoalActions } from "@/hooks/goals/use-goal-actions";
import { useFormModal } from "@/stores/use-form-modal-store";
import { Plus } from "lucide-react";

export const AppSidebarFooter = () => {
  const { onOpen: onOpenFormModal } = useFormModal();
  const { createGoal } = useGoalActions();

  // 모달
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
    <div className="flex justify-between items-center px-5 py-2">
      <Button
        onClick={handleOpenFormModal}
        className="w-full border-[1px] border-blue-500 text-blue-500 text-base bg-white hover:bg-blue-300 hover:text-blue-800"
      >
        <Plus />
        <div>새 목표</div>
      </Button>
    </div>
  );
};
