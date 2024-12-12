import { TodoBadge } from "@/components/shared/badges/todo-badge";
import { Goal } from "@/public/svgs";
import { Todo } from "@/types/todo";

interface NoteEditInfoProps {
  todo: Todo;
}
const NoteEditInfo = ({ todo }: NoteEditInfoProps) => {
  return (
    <div className="mt-5 mb-5">
      <div className="flex items-center mb-3">
        <Goal className="w-6 h-6" />
        <div className="ml-1.5 text-base font-semibold">{todo.goal.title}</div>
      </div>
      <div className="flex items-center">
        <TodoBadge />
        <div className="text-sm font-normal">{todo.title}</div>
      </div>
    </div>
  );
};

export default NoteEditInfo;
