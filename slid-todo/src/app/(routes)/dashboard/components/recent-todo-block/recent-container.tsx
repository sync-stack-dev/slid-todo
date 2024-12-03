import { useRecentTodos } from "@/hooks/todo/use-todos";
import TodoItem from "@/components/shared/todo-list/todo-item";

const RecentContainer = () => {
  const { data, error, isLoading, isError } = useRecentTodos();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="text-gray-400 dark:text-slate-400 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 에러 상태 처리
  if (isError && error instanceof Error) {
    return (
      <div className="text-red-500 dark:text-red-400 flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  // 데이터 렌더링
  return (
    <div className="w-full h-full space-y-2 bg-background text-foreground dark:black rounded-xl">
      {data?.todos && data.todos.length > 0 ? (
        data.todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-slate-400 transition-colors">
          최근에 등록한 할 일이 없어요
        </div>
      )}
    </div>
  );
};

export default RecentContainer;
