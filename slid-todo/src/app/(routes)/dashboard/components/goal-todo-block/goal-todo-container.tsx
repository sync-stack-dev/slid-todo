"use client";
import { useEffect } from "react";
import { useGoalListInfinite } from "@/hooks/goals/use-dashboard-goals";
import { useGoalTodosInfinite } from "@/hooks/goals/use-goal-todos";
import { useInView } from "react-intersection-observer";
import TodoItem from "@/components/shared/todo-list/todo-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { useFormModal } from "@/stores/use-form-modal-store";
import { ChevronDown } from "lucide-react";
import EmptyState from "@/components/shared/empty-state";
import Link from "next/link";
interface Goal {
  id: number;
  title: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  teamId: string;
}

const GoalToDoContainer = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGoalListInfinite();
  const { ref: goalRef, inView: goalInView } = useInView();

  useEffect(() => {
    if (goalInView && hasNextPage) {
      fetchNextPage();
    }
  }, [goalInView, hasNextPage, fetchNextPage]);

  const goals = data?.pages.flatMap((page) => page.goals) || [];

  // ScrollArea 밖으로 EmptyState 이동
  if (goals.length === 0) {
    return (
      <div
        className="w-full h-[calc(100vh-340px)] flex items-center justify-center"
        data-cy="no-goals-message"
      >
        <EmptyState message="등록한 목표가 없어요" />
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[80vh] p-4 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {goals.map((goal) => (
          <TodoSection key={goal.id} goal={goal} />
        ))}
        {hasNextPage && <div ref={goalRef} className="h-10" />}
        {isFetchingNextPage && <p>할 일 더보기...</p>}
      </div>
    </ScrollArea>
  );
};

const TodoSection = ({ goal }: { goal: Goal }) => {
  const {
    data: todoData,
    fetchNextPage: fetchTodoNextPage,
    hasNextPage: hasTodoNextPage,
    isFetchingNextPage: isFetchingTodoNextPage,
    status: todoStatus,
  } = useGoalTodosInfinite(goal.id, false, 4);
  const {
    data: doneData,
    fetchNextPage: fetchDoneNextPage,
    hasNextPage: hasDoneNextPage,
    isFetchingNextPage: isFetchingDoneNextPage,
    status: doneStatus,
  } = useGoalTodosInfinite(goal.id, true, 4);

  const todos = todoData?.pages.flatMap((page) => page.todos) || [];
  const doneTodos = doneData?.pages.flatMap((page) => page.todos) || [];

  // 다음 커서 값 찾기
  const todosCursor = todoData?.pages[todoData.pages.length - 1].nextCursor;
  const doneTodosCursor = doneData?.pages[doneData.pages.length - 1].nextCursor;
  // 더보기 버튼 클릭, 할일 리스트 더 불러오기
  const loadMore = () => {
    if (hasTodoNextPage) fetchTodoNextPage(); // 미완료 할 일 데이터 추가 불러오기
    if (hasDoneNextPage) fetchDoneNextPage(); // 완료된 할 일 데이터 추가 불러오기
  };

  // 할일추가 모달
  const { onOpen: onOpenFormModal } = useFormModal(); // 추가
  const { createTodo } = useTodoActions(); // 추가
  const handleOpenFormModal = () => {
    // 함수 추가
    onOpenFormModal({
      type: "todo",
      mode: "create",
      defaultValues: {
        id: 0,
        title: "",
        goal: {
          id: Number(goal.id),
          title: "",
        },
      },
      onSubmit: (data) => {
        createTodo(data);
      },
    });
  };
  if (todoStatus === "pending" || doneStatus === "pending") {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-slate-200/10 rounded-3xl p-4 shadow-md">
      <div className="flex justify-between p-2">
        <Link href={`/goals/${goal.id}`} key={goal.id}>
          <h1 className="text-lg font-semibold mb-2 text-foreground">{goal.title}</h1>
        </Link>
        <Button
          className="bg-transparent text-blue-600 dark:text-slate-400 text-sm hover:bg-transparent hover:text-blue-600 dark:hover:text-slate-200 p-0 transition-colors"
          onClick={handleOpenFormModal}
        >
          + 할 일 추가
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-2 bg-white dark:bg-background rounded-2xl p-0.5 px-2">
        <Progress value={goal.progress} className="w-full h-1.5 rounded-2xl" />
        <p className="text-sm font-semibold text-foreground" data-cy="progress">
          {goal.progress}%
        </p>
      </div>

      {todos.length > 0 || doneTodos.length > 0 ? (
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full rounded-lg h-[40%] flex flex-col">
            <div className="flex-1 px-2 mt-2">
              <h2 className="mb-2 text-foreground">To do</h2>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>

          <div className="w-full rounded-lg h-[40%] flex flex-col">
            <div className="flex-1 px-2 mt-2">
              <h2 className="mb-2 text-foreground">Done</h2>
              {doneTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[180px] flex items-center justify-center">
          <EmptyState message="아직 등록된 할 일이 없어요" />
        </div>
      )}

      <div className="w-full flex justify-center">
        {(todos.length < 0 && doneTodos.length < 0) ||
        (todosCursor === null && doneTodosCursor === null) ? null : (
          <Button
            className="w-32 h-8 mt-4 mb-2 bg-white dark:bg-slate-800 text-[#333] dark:text-foreground rounded-2xl hover:bg-accent dark:hover:bg-slate-700 transition-colors"
            onClick={loadMore}
            disabled={isFetchingTodoNextPage || isFetchingDoneNextPage}
          >
            {isFetchingTodoNextPage || isFetchingDoneNextPage ? (
              "로딩 중..."
            ) : (
              <>
                <span className="dark:hover:text-primary">더보기</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default GoalToDoContainer;
