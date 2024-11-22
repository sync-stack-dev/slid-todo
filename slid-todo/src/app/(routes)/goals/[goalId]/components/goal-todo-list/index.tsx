import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface GoalTodoListProps {
  todos?: Array<{
    id: number;
    title: string;
    done: boolean;
    linkUrl?: string;
    noteId?: number;
  }>;
}

export const GoalTodoList = ({ todos = [] }: GoalTodoListProps) => {
  console.log(todos);
  return (
    <div className="bg-white rounded-lg p-6 space-y-4 max-w-[588px] mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">To do</h2>
        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
          <Plus className="w-4 h-4 mr-1" />
          할일 추가
        </Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={todo.done} readOnly />
              <span className="text-sm">{todo.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {todo.linkUrl && <span>🔗</span>}
              {todo.noteId && <span>📝</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
