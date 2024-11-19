import { Todo } from "@/actions/todo/types";
import { CopyButton } from "./copy-button";
import { LinkButton } from "./link-button";
import { FileButton } from "./file-button";
import { NoteButton } from "./note-button";

interface ActionButtonsProps {
  todo: Todo;
  onNoteClick: () => void;
}

export const ActionButtons = ({ todo, onNoteClick }: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      {!todo.done && (
        <>
          <CopyButton />
          {todo.linkUrl && <LinkButton url={todo.linkUrl} />}
        </>
      )}
      {todo.fileUrl && <FileButton url={todo.fileUrl} />}
      {todo.noteId !== null && todo.noteId > 0 && <NoteButton onClick={onNoteClick} />}
    </div>
  );
};
