import { useRecentTodos } from "@/hooks/todo/use-todos";
import TodoItem from "@/components/shared/todo-list/todo-item";

const RecentContainer = () => {
  const { data, error, isLoading, isError } = useRecentTodos();

  // 로딩 상태 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러 상태 처리
  if (isError && error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  // 데이터 렌더링
  return (
    <div className="w-full h-full space-y-2">
      {data?.todos && data.todos.length > 0 ? (
        data.todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          최근에 등록한 할 일이 없어요
        </div>
      )}
    </div>
  );
};

export default RecentContainer;
