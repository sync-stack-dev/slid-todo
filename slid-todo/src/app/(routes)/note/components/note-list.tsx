"use client";

import { Note } from "@/types/note";
import NoteCardAction from "./note-card-action";
import { useNoteList } from "@/hooks/note/use-note";
import { Loading } from "@/components/shared/loading";
interface NoteListProps {
  goalId: number;
}
const NoteList = ({ goalId }: NoteListProps) => {
  const { data, isLoading } = useNoteList(goalId);

  if (isLoading) return <Loading />;

  if (!data) {
    return <div>노 리스트요</div>;
  }

  return (
    <div className="grid gap-2.5 grid-cols-1 ">
      {data.notes.map((note: Note) => (
        <NoteCardAction key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
