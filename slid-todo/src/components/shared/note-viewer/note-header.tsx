import { X } from "lucide-react";
import { Note } from "@/types/note";
import { Todo } from "@/types/todo";
import { cn } from "@/utils/cn";
import { Goal } from "@/public/svgs";

interface NoteHeaderProps {
  todo: Todo;
  noteData: Note | null;
  onClose: () => void;
}

export const NoteHeader = ({ todo, noteData, onClose }: NoteHeaderProps) => {
  console.log(noteData);
  return (
    <header className="border-b p-4 mt-12">
      <button
        onClick={onClose}
        aria-label="닫기"
        className={cn("absolute left-4 top-4", "hover:bg-gray-100 rounded-sm", "p-1")}
      >
        <X className="h-6 w-6" data-cy="close-button" />
      </button>
      <nav className="flex items-center mb-4 flex-shrink-0 gap-2">
        <Goal className="w-6 h-6" />
        <span className="text-base leading-6 font-medium font-pretendard underline-offset-[from-font] decoration-skip-ink-none text-left">
          {noteData?.goal?.title}
        </span>
      </nav>
      <section className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="bg-gray-100 text-xs px-2 py-1 rounded-md text-gray-800 whitespace-nowrap text-center">
          To do
        </span>
        <span>{todo.title}</span>
      </section>
      <section className="flex items-center justify-between">
        <h1 className="text-lg font-medium">{noteData?.title}</h1>
        <time className="text-sm text-gray-500" dateTime={noteData?.updatedAt}>
          {new Date(noteData?.updatedAt || "").toLocaleDateString()}
        </time>
      </section>
    </header>
  );
};
