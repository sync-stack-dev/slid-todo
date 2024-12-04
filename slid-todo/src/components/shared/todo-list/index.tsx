import { Todo } from "@/types/todo";
import TodoItem from "./todo-item";
import { InfiniteScrollTrigger } from "@/components/shared/infinite-scroll-trigger";

interface TodoListProps {
  todos: Todo[];
  observerRef: (node?: Element | null) => void;
  isLoading: boolean;
}

export const TodoList = ({ todos, observerRef, isLoading }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="flex-1 relative min-h-[500px] ">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">등록된 일이 없어요</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto dark:bg-gray-900">
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <InfiniteScrollTrigger ref={observerRef} isLoading={isLoading} />
      </div>
    </div>
  );
};
