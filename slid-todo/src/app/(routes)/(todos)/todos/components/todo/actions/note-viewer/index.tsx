import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Note } from "@/actions/note/types";
import { Todo } from "@/actions/todo/types";
import { NoteHeader } from "./note-header";
import { NoteContent } from "./note-content";
import { cn } from "@/lib/utils";

interface NoteViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo;
  noteData: Note | null;
}

export const NoteViewer = ({ isOpen, onOpenChange, todo, noteData }: NoteViewerProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        data-cy="note-sheet"
        className={cn(
          "w-[95vw] md:w-[800px] sm:max-w-[800px]",
          "p-0",
          "[&_button[type='button']]:hidden",
        )}
      >
        <NoteHeader todo={todo} noteData={noteData} onClose={() => onOpenChange(false)} />
        <NoteContent noteData={noteData} />
      </SheetContent>
    </Sheet>
  );
};
