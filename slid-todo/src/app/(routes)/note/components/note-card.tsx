import { Note } from "@/types/note";
import NoteList from "../../../../../public/svgs/note-list";
import { Separator } from "@/components/ui/separator";
import NoteMeatballBtn from "./note-meatball-btn";

interface NoteCardProps {
  note: Note;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NoteCard = ({ note, onClick }: NoteCardProps) => {
  return (
    <div
      onClick={onClick}
      className="grid gap-2.5 grid-cols-1 bg-white w-1/2 p-[24px] border-[1px] border-slate-100 rounded-xl cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-slate-50"
    >
      <div className="flex justify-between">
        <NoteList />
        <NoteMeatballBtn noteId={note.id} />
      </div>
      <div className="text-slate-800 text-lg">{note.title}</div>
      <Separator className="border-[1px]" />
      <div className="flex text-xs text-slate-700 items-center">
        <div
          className="bg-slate-100 rounded-lg mr-2 flex justify-center items-center px-[3px] py-[2px]
        "
        >
          To do
        </div>
        <div className=" ">{note.todo.title}</div>
      </div>
    </div>
  );
};

export default NoteCard;
