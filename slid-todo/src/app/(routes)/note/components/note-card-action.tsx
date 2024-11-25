import { NoteViewer } from "@/components/shared/note-viewer";
import NoteCard from "./note-card";
import { useState } from "react";
import { Note } from "@/types/note";
import { useTodoById } from "@/hooks/todo/use-todos";

interface NoteCardActionProps {
  note: Note;
}

const NoteCardAction = ({ note }: NoteCardActionProps) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const { todo, isLoading, isError } = useTodoById(note.todo.id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !todo) return <div>Error loading Todo</div>;

  return (
    <>
      <NoteCard key={note.id} note={note} onClick={() => setIsNoteOpen(true)} />
      <NoteViewer
        data-cy="note-viewer"
        isOpen={isNoteOpen}
        onOpenChange={setIsNoteOpen}
        todo={todo}
        noteData={note}
      />
    </>
  );
};

export default NoteCardAction;
