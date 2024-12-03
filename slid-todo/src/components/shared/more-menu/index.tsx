import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuItems } from "./menu-items";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { useFormModal } from "@/stores/use-form-modal-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Todo } from "@/types/todo";
import { Note } from "@/types/note";
import { Goal } from "@/types/goal";

interface MoreMenuProps {
  onDelete: {
    title: string;
    description: string;
    action: () => Promise<void>;
  };
  onEdit: {
    type: "todo" | "note" | "goal";
    data: Todo | Note | Goal;
    action: (data: any) => Promise<void>;
  };
}

/**
 * 할 일, 노트, 목표의 수정/삭제 기능을 제공하는 드롭다운 메뉴입니다.
 *
 * @param onDelete - 삭제 관련 설정
 * @param onDelete.title - 삭제 확인 모달의 제목
 * @param onDelete.description - 삭제 확인 모달의 설명
 * @param onDelete.action - 삭제 실행 함수
 * @param onEdit - 수정 관련 설정
 * @param onEdit.type - 수정할 항목의 타입 ("todo" | "note" | "goal")
 * @param onEdit.data - 수정할 데이터
 * @param onEdit.action - 수정 실행 함수
 */
export const MoreMenu = ({ onDelete, onEdit }: MoreMenuProps) => {
  const { onOpen } = useConfirmModal();
  const { onOpen: onOpenFormModal } = useFormModal();

  const handleDelete = () => {
    onOpen({
      title: onDelete.title,
      description: onDelete.description,
      confirmText: "삭제",
      variant: "danger",
      onConfirm: onDelete.action,
    });
  };

  const handleEdit = () => {
    onOpenFormModal({
      type: onEdit.type,
      mode: "edit",
      defaultValues: onEdit.data,
      onSubmit: onEdit.action,
    });
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-1 hover:bg-gray-100 rounded-full w-8 h-8"
                data-cy="more-button"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>더보기</TooltipContent>
        </Tooltip>
        <MenuItems onDelete={handleDelete} onEdit={handleEdit} />
      </DropdownMenu>
    </TooltipProvider>
  );
};
