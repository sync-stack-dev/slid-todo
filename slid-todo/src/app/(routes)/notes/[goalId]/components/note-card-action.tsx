import { NoteViewer } from "@/components/shared/note-viewer";
import NoteCard from "./note-card";
import { useState } from "react";
import { Note } from "@/types/note";
import { useTodoById } from "@/hooks/todo/use-todos";
import { useNoteById } from "@/hooks/note/use-note";
import { Loading } from "@/components/shared/loading";

interface NoteCardActionProps {
  note: Note;
}

const NoteCardAction = ({ note }: NoteCardActionProps) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const { todo, isLoading: isTodoLoading, isError: isTodoError } = useTodoById(note.todo.id);
  const { data: noteData, isLoading: isNoteLoading, isError: isNoteError } = useNoteById(note.id);

  if (isNoteLoading || isTodoLoading || isNoteError || !noteData || isTodoError || !todo)
    return <Loading />;

  return (
    <>
      <NoteCard key={note.id} note={note} onClick={() => setIsNoteOpen(true)} />

      <NoteViewer
        data-cy="note-viewer"
        isOpen={isNoteOpen}
        onOpenChange={setIsNoteOpen}
        todo={todo}
        noteData={noteData}
      />
    </>
  );
};

export default NoteCardAction;
