import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTodosInfinite } from "@/hooks/use-todos";
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

  return (
    <div className="flex-1 overflow-auto h-[500px]">
      <div className="space-y-1">
        {displayTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <InfiniteScrollTrigger ref={ref} isLoading={isFetchingNextPage} />
      </div>
    </div>
  );
};
