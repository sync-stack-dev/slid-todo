import { Sheet, SheetContent, SheetPortal, SheetTitle } from "@/components/ui/sheet";
import { Note } from "@/types/note";
import { Todo } from "@/types/todo";
import { NoteHeader } from "./note-header";
import { NoteContent } from "./note-content";
import { cn } from "@/utils/cn";
import EmbedContent from "./embed-content";
import { useMediaQuery } from "@/hooks/use-media-query";

interface NoteViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo;
  noteData: Note | null;
}

export const NoteViewer = ({ isOpen, onOpenChange, todo, noteData }: NoteViewerProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1350px)");

  return (
    <div className="relative">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetPortal>
          {noteData?.linkUrl && isLargeScreen && (
            <EmbedContent
              className="hidden min-[1350px]:block pointer-events-auto z-[60]"
              url={noteData.linkUrl}
              isVisible={true}
            />
          )}
        </SheetPortal>
        <SheetContent
          side="right"
          data-testid="note-viewer-sheet"
          data-cy="te-sheet"
          className={cn(
            "w-full",
            "sm:w-[95%] md:w-[95%] min-[1350px]:w-[800px]",
            "sm:max-w-[800px]",
            "p-0",
            "[&_button[type='button']]:hidden",
            "overflow-auto",
            "flex flex-col",
          )}
        >
          <SheetTitle className="sr-only">{todo.title} 노트</SheetTitle>

          <NoteHeader todo={todo} noteData={noteData} onClose={() => onOpenChange(false)} />
          <div className="flex-1 flex flex-col min-h-0">
            {noteData?.linkUrl && !isLargeScreen && (
              <EmbedContent className="w-full flex-none" url={noteData.linkUrl} isVisible={true} />
            )}
            {noteData && (
              <div className="flex-1 overflow-auto">
                <NoteContent noteData={noteData} />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
