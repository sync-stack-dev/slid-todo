"use client";
import { Note } from "@/types/note";
import NoteCardAction from "./note-card-action";
import { useNoteList } from "@/hooks/note/use-note";
import { Loading } from "@/components/shared/loading";

interface NoteListProps {
  goalId: number;
}
const NoteList = ({ goalId }: NoteListProps) => {
  const { data, isLoading, isError } = useNoteList(goalId);
  console.log(data, goalId);
  if (!goalId || isError) return <div> 잘못된 접근입니다.</div>;
  if (!data || data.notes.length === 0)
    return (
      <div className="flex flex-1 justify-center items-center">
        <div className="text-slate-500 text-sm">아직 등록된 노트가 없어요</div>
      </div>
    );
  if (isLoading) return <Loading />;

  return (
    <div className="grid gap-2.5 grid-cols-1 ">
      {data.notes.map((note: Note) => (
        <NoteCardAction key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
