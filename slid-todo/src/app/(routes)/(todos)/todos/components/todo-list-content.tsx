import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTodosInfinite } from "@/hooks/todo/use-todos";
import { getFilteredTodos, TabType } from "./utils";
import { Todo } from "@/types/todo";
import { TodoList } from "@/components/shared/todo-list";

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
    <div className="flex-1">
      <TodoList todos={displayTodos} observerRef={ref} isLoading={isFetchingNextPage} />
    </div>
  );
};
