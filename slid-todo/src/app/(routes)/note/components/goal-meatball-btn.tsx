import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface MeatballBtnProps {
  noteId: number;
}

const GoalMeatballBtn = ({ noteId }: MeatballBtnProps) => {
  //  TODO : id 를 이용한 수정 및 삭제 기능 구현

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="w-[24px] h-[24px] rounded-full p-1 hover:bg-slate-100" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="hover:bg-slate-100">수정하기</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-[1px]" />
        <DropdownMenuItem className="hover:bg-slate-100">삭제하기</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GoalMeatballBtn;
