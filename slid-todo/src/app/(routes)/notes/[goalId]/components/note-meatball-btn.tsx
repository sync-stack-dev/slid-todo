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
import { useRouter } from "next/navigation";

interface MeatballBtnProps {
  noteId: number;
  onDelete: {
    title: string;
    description: string;
    action: () => Promise<void>;
  };
}

const NoteMeatballBtn = ({ noteId, onDelete }: MeatballBtnProps) => {
  const { onOpen } = useConfirmModal();
  const router = useRouter();

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

  const handleEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.push(`/notes/edit/${noteId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="w-[24px] h-[24px] rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(event) => handleEdit(event)}
          className="hover:bg-slate-100 hover:cursor-pointer"
        >
          수정하기
        </DropdownMenuItem>
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
