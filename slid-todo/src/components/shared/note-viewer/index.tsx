/**
 * 할 일의 노트를 보여주는 시트 컴포넌트입니다.
 * 데이터 페칭은 상위 컴포넌트에서 처리해야 합니다.
 *
 * @example
 * 상위 컴포넌트에서 데이터 패칭 후 전달
 * const ParentComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   데이터 페칭 예시
 *   const { data: todo } = useTodoQuery(todoId);
 *   const { data: noteData } = useNoteQuery(todoId);
 *
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>
 *         {todo.title}
 *       </button>
 *       <NoteViewer
 *         isOpen={isOpen}
 *         onOpenChange={setIsOpen}
 *         todo={todo}
 *         noteData={noteData}
 *       />
 *     </>
 *   );
 * };
 *
 * @param props.isOpen - 시트의 열림/닫힘 상태
 * @param props.onOpenChange - 시트 상태 변경 핸들러
 * @param props.todo - 상위 컴포넌트에서 페칭한 할 일 데이터
 * @param props.noteData - 상위 컴포넌트에서 페칭한 노트 데이터
 */

import { Sheet, SheetContent, SheetOverlay, SheetPortal, SheetTitle } from "@/components/ui/sheet";
import { Note } from "@/types/note";
import { Todo } from "@/types/todo";
import { NoteHeader } from "./note-header";
import { NoteContent } from "./note-content";
import { cn } from "@/utils/cn";
import EmbedContent from "./embed-content";
import { ensureHttps } from "@/utils/url";

interface NoteViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo;
  noteData: Note | null;
}

export const NoteViewer = ({ isOpen, onOpenChange, todo, noteData }: NoteViewerProps) => {
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        {noteData?.linkUrl && (
          <EmbedContent
            url="www.daum.net"
            // url={noteData.linkUrl}
            isVisible={noteData?.linkUrl ? true : false}
          />
        )}
        <SheetContent
          side="right"
          data-testid="note-viewer-sheet"
          data-cy="te-sheet"
          className={cn(
            "w-full",
            "sm:w-[95%] md:w-[95%] lg:w-[800px]",
            "sm:max-w-[800px]",
            "p-0",
            "[&_button[type='button']]:hidden",
          )}
        >
          <SheetTitle className="sr-only">{todo.title} 노트</SheetTitle>
          <NoteHeader todo={todo} noteData={noteData} onClose={() => onOpenChange(false)} />
          {noteData && <NoteContent noteData={noteData} />}
        </SheetContent>
      </Sheet>
    </>
  );
};
