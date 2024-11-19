import { Todo } from "@/actions/todo/types";
import { Link, MoreHorizontal, Copy, FileText, Notebook, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Note } from "@/actions/note/types";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface TodoItemActionsProps {
  todo: Todo;
}

const TodoItemActions = ({ todo }: TodoItemActionsProps) => {
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
        {!todo.done && (
          <>
            <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
              <Copy className="w-4 h-4" />
            </Button>
            {todo.linkUrl && (
              <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
                <Link className="w-4 h-4" />
              </Button>
            )}
          </>
        )}
        {todo.fileUrl && (
          <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
            <FileText className="w-4 h-4" />
          </Button>
        )}
        {todo.noteId !== null && todo.noteId > 0 && (
          <Button
            variant="ghost"
            onClick={handleNoteClick}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Notebook className="w-4 h-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>수정하기</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">삭제하기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Sheet open={isNoteOpen} onOpenChange={setIsNoteOpen}>
        <SheetContent
          side="right"
          className={cn(
            "w-[95vw] md:w-[800px] sm:max-w-[800px]",
            "p-0",
            "[&_button[type='button']]:hidden",
          )}
        >
          <button
            onClick={() => setIsNoteOpen(false)}
            className={cn("absolute left-4 top-4", "hover:bg-gray-100 rounded-sm", "p-1")}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="border-b p-4 mt-12">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span>To do.</span>
              <span>{todo.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{noteData?.title}</h2>
              <span className="text-sm text-gray-500">
                {new Date(noteData?.updatedAt || "").toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-600">{noteData?.content}</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TodoItemActions;
