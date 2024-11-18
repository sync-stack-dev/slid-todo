// components/todo/todo-list/todo-item-actions.tsx
import { Todo } from "@/actions/todo/types";
import { Link, MoreHorizontal, Pencil, Copy, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TodoItemActionsProps {
  todo: Todo;
}

const TodoItemActions = ({ todo }: TodoItemActionsProps) => {
  return (
    <div className="ml-auto flex items-center gap-2 text-gray-400">
      {!todo.done && (
        <>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Copy className="w-4 h-4" />
          </button>
          {todo.linkUrl && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Link className="w-4 h-4" />
            </button>
          )}
        </>
      )}
      {todo.fileUrl && (
        <button className="p-1 hover:bg-gray-100 rounded">
          <FileText className="w-4 h-4" />
        </button>
      )}
      {todo.isTemplate && (
        <button className="p-1 hover:bg-gray-100 rounded">
          <Pencil className="w-4 h-4" />
        </button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>수정하기</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">삭제하기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TodoItemActions;
