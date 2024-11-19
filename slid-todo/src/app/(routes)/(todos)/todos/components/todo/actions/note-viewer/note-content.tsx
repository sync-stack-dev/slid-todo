import { Note } from "@/actions/note/types";

interface NoteContentProps {
  noteData: Note | null;
}

export const NoteContent = ({ noteData }: NoteContentProps) => {
  return (
    <div className="p-4">
      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-gray-600">{noteData?.content}</div>
      </div>
    </div>
  );
};
