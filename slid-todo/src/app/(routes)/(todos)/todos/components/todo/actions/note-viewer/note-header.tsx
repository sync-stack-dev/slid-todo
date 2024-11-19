import { X } from "lucide-react";
import { Note } from "@/actions/note/types";
import { Todo } from "@/actions/todo/types";
import { cn } from "@/lib/utils";

interface NoteHeaderProps {
  todo: Todo;
  noteData: Note | null;
  onClose: () => void;
}

export const NoteHeader = ({ todo, noteData, onClose }: NoteHeaderProps) => {
  return (
    <div className="border-b p-4 mt-12">
      <button
        onClick={onClose}
        className={cn("absolute left-4 top-4", "hover:bg-gray-100 rounded-sm", "p-1")}
      >
        <X className="h-4 w-4" data-cy="close-button" />
      </button>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>To do.</span>
        <span>{todo.title}</span>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{noteData?.title}</h2>
        <span className="text-sm text-gray-500">
          {new Date(noteData?.updatedAt || "").toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
