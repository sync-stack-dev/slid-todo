import { Button } from "@/components/ui/button";
import { Notebook } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NoteButtonProps {
  onClick: () => void;
}

export const NoteButton = ({ onClick }: NoteButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" onClick={onClick} className="p-1 hover:bg-gray-100 rounded">
          <Notebook className="w-4 h-4" data-cy="note-button" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>노트 열기</TooltipContent>
    </Tooltip>
  );
};
