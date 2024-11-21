import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTodosInfinite } from "@/hooks/todo/use-todos";
import TodoItem from "./todo-item";
import { InfiniteScrollTrigger } from "./infinite-scroll-trigger";
import { getFilteredTodos, TabType } from "./utils";
import { Todo } from "@/actions/todo/types";

interface TodoPage {
  todos: Todo[];
  totalCount: number;
}

interface TodoListContentProps {
  data: {
    pages: TodoPage[];
    pageParams: any[];
  };
  activeTab: TabType;
}

export const TodoListContent = ({ data, activeTab }: TodoListContentProps) => {
  const { ref, inView } = useInView();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useTodosInfinite();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allTodos = data?.pages.flatMap((page: TodoPage) => page.todos) || [];
  const displayTodos = getFilteredTodos(allTodos, activeTab);

  if (displayTodos.length === 0) {
    return (
      <div className="flex-1 relative min-h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">등록된 일이 없어요</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto h-[500px]">
      <div className="space-y-1">
        {displayTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <InfiniteScrollTrigger ref={ref} isLoading={isFetchingNextPage} />
      </div>
    </div>
  );
};
