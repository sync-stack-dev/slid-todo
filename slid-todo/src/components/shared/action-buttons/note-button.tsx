import { Button } from "@/components/ui/button";
import { Notebook } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NoteButtonProps {
  onClick?: () => void;
}

export const NoteButton = ({ onClick }: NoteButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={onClick}
          className="p-1 hover:bg-gray-100 rounded-full aspect-square w-8 h-8"
        >
          <Notebook className="text-blue-400" data-cy="note-button" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>노트 열기</TooltipContent>
    </Tooltip>
  );
};
