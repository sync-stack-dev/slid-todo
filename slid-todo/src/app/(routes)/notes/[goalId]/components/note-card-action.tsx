import { NoteViewer } from "@/components/shared/note-viewer";
import NoteCard from "./note-card";
import { useState } from "react";
import { Note } from "@/types/note";
import { useNoteById } from "@/hooks/note/use-note";
import { Todo } from "@/types/todo";

interface NoteCardActionProps {
  note: Note;
}

const NoteCardAction = ({ note }: NoteCardActionProps) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const { data: noteData, isError: isNoteError } = useNoteById(note.id);

  const todoData: Todo = {
    ...note.todo,
    goal: note.goal,
    userId: note.userId,
    teamId: note.teamId,
    updatedAt: note.updatedAt,
    createdAt: note.createdAt,
  };
  if (isNoteError || !noteData) return null;

  return (
    <>
      <NoteCard key={note.id} note={note} onClick={() => setIsNoteOpen(true)} />
      <NoteViewer
        data-cy="note-viewer"
        aria-hidden={!isNoteOpen}
        isOpen={isNoteOpen}
        onOpenChange={setIsNoteOpen}
        todo={todoData}
        noteData={noteData}
      />
    </>
  );
};

export default NoteCardAction;
