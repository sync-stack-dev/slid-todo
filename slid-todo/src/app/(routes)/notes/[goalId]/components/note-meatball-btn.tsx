import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { EllipsisVertical } from "lucide-react";

interface MeatballBtnProps {
  onDelete: {
    title: string;
    description: string;
    action: () => Promise<void>;
  };
}

const NoteMeatballBtn = ({ onDelete }: MeatballBtnProps) => {
  const { onOpen } = useConfirmModal();

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onOpen({
      title: onDelete.title,
      description: onDelete.description,
      confirmText: "삭제",
      variant: "danger",
      onConfirm: onDelete.action,
    });
  };

  const handleEdit = () => {
    // TODO : redirect 노트 수정 페이지
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="w-[24px] h-[24px] rounded-full p-1 hover:bg-slate-100" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="hover:bg-slate-100 hover:cursor-pointer">
          수정하기
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-[1px]" />
        <DropdownMenuItem
          onClick={(event) => handleDelete(event)}
          className="hover:bg-slate-100 hover:cursor-pointer"
        >
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteMeatballBtn;
