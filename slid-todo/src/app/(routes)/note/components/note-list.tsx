"use client";
import { Note } from "@/types/note";
import NoteCardAction from "./note-card-action";
import { useNoteList } from "@/hooks/note/use-note";
import { Loading } from "@/components/shared/loading";

interface NoteListProps {
  goalId: number;
}
const NoteList = ({ goalId }: NoteListProps) => {
  const { data } = useNoteList(goalId);

  if (!goalId) return <div>빈화면</div>;

  if (!data) return <Loading />;

  return (
    <div className="grid gap-2.5 grid-cols-1 ">
      {data.notes.map((note: Note) => (
        <NoteCardAction key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
