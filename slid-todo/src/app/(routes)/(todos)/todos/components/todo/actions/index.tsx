import { useState } from "react";
import { Todo } from "@/types/todo";
import { Note } from "@/types/note";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { ActionButtons } from "./action-buttons";
import { MoreMenu } from "./more-menu";
import { NoteViewer } from "./note-viewer";

interface TodoActionsProps {
  todo: Todo;
}

const TodoActions = ({ todo }: TodoActionsProps) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteData, setNoteData] = useState<Note | null>(null);

  const handleNoteClick = async () => {
    try {
      const response = await instance.get(`/notes/${todo.noteId}`);
      setNoteData(response.data);
      setIsNoteOpen(true);
    } catch (error) {
      console.error("노트 조회 실패:", error);
      toast.error("노트 조회에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="ml-auto flex items-center gap-2 text-gray-400">
        <ActionButtons todo={todo} onNoteClick={handleNoteClick} />
        <MoreMenu todo={todo} />
      </div>
      <NoteViewer
        isOpen={isNoteOpen}
        onOpenChange={setIsNoteOpen}
        todo={todo}
        noteData={noteData}
      />
    </>
  );
};

export default TodoActions;
