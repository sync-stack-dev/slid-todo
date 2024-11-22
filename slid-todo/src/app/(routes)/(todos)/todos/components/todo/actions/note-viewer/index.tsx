import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Note } from "@/types/note";
import { Todo } from "@/types/todo";
import { NoteHeader } from "./note-header";
import { NoteContent } from "./note-content";
import { cn } from "@/utils/cn";

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
          "w-full sm:w-[95vw] md:w-[800px] sm:max-w-[800px]", // 모바일에서만 w-full 적용
          "p-0",
          "[&_button[type='button']]:hidden",
        )}
      >
        <SheetTitle className="sr-only">{todo.title} 노트</SheetTitle>
        <NoteHeader todo={todo} noteData={noteData} onClose={() => onOpenChange(false)} />
        <NoteContent noteData={noteData} />
      </SheetContent>
    </Sheet>
  );
};
