"use client";
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
  /** 삭제 관련 설정 */
  onDelete: {
    /** 삭제 확인 모달의 제목 */
    title: string;
    /** 삭제 확인 모달의 설명 */
    description: string;
    /** 삭제 실행 함수 */
    action: () => Promise<void>;
  };
  /** 수정 관련 설정 */
  onEdit: {
    /** 수정할 항목의 타입 */
    type: "todo" | "note" | "goal";
    /** 수정할 데이터 */
    data: Todo | Note | Goal;
    /** 수정 실행 함수 */
    action: (data: any) => Promise<void>;
  };
}

/**
 * 더보기 메뉴 컴포넌트
 *
 * 할 일이나 노트의 수정/삭제 기능을 제공하는 드롭다운 메뉴입니다.
 *
 * @example
 * ```tsx
 * <MoreMenu
 *   onDelete={{
 *     title: "할 일을 삭제하시겠어요?",
 *     description: "삭제한 할 일은 복구할 수 없습니다.",
 *     action: deleteTodo
 *   }}
 *   onEdit={{
 *     type: "todo",
 *     data: todo,
 *     action: updateTodo
 *   }}
 * />
 * ```
 */
export const MoreMenu = ({ onDelete, onEdit }: MoreMenuProps) => {
  const { onOpen } = useConfirmModal();
  const { onOpen: onOpenFormModal } = useFormModal();

  /**
   * 삭제 확인 모달을 열고 삭제 작업을 처리합니다.
   */
  const handleDelete = () => {
    onOpen({
      title: onDelete.title,
      description: onDelete.description,
      confirmText: "삭제",
      variant: "danger",
      onConfirm: onDelete.action,
    });
  };

  /**
   * 수정 폼 모달을 열고 수정 작업을 처리합니다.
   */
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
              <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4" data-cy="more-button" />
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
