import {
  FilePlus, // 새 문서
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
interface CreateNoteButtonProps {
  onClick?: () => void;
}
export const CreateNoteButton = ({ onClick }: CreateNoteButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={onClick}
          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-full aspect-square w-8 h-8"
        >
          <FilePlus className="h-4 w-4" data-cy="create-note-button" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>노트 작성</TooltipContent>
    </Tooltip>
  );
};
