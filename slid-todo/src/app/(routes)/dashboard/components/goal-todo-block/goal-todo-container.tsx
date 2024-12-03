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
  const {
    data,
    isLoading: isGoalLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGoalListInfinite();
  const { ref: goalRef, inView: goalInView } = useInView(); // 목표 스크롤 감지

  useEffect(() => {
    if (goalInView && hasNextPage) {
      fetchNextPage(); // 스크롤 감지 시 다음 목표 로드
    }
  }, [goalInView, hasNextPage, fetchNextPage]);

  if (isGoalLoading) {
    return <div>Loading...</div>; // 목표 데이터 로딩 중
  }

  const goals = data?.pages.flatMap((page) => page.goals) || [];

  // 대시보드에서 목표가 없을 때, 처리
  if (goals.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center">등록한 목표가 없어요</div>
    );
  }

  return (
    <ScrollArea className="max-h-[80vh] p-4 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {goals.map((goal) => (
          <TodoSection key={goal.id} goal={goal} />
        ))}
        {/* 목표 리스트 무한 스크롤 트리거 요소 */}
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
  } = useGoalTodosInfinite(goal.id, false, 4);
  const {
    data: doneData,
    fetchNextPage: fetchDoneNextPage,
    hasNextPage: hasDoneNextPage,
    isFetchingNextPage: isFetchingDoneNextPage,
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
        description: "",
        done: false,
        fileUrl: "",
        linkUrl: "",
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

  return (
    <div className="bg-slate-200 rounded-xl p-4 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-md font-semibold mb-2">{goal.title}</h1>
        <Button className="bg-slate-200 text-blue-500 hover:bg-white" onClick={handleOpenFormModal}>
          + 할일 추가
        </Button>
      </div>

      {goal.progress > 0 ? (
        <div className="flex items-center gap-4 mb-2">
          <Progress value={goal.progress} className="w-full h-2" />
          <p className="text-sm font-semibold">{goal.progress}%</p>
        </div>
      ) : null}

      {todos.length > 0 || doneTodos.length > 0 ? (
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full bg-slate-200 rounded-lg p-4 h-[40%] flex flex-col">
            <div className="flex-1 px-4">
              <h2 className="mb-2">Todo</h2>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>

          <div className="w-full bg-slate-200 rounded-lg p-4 h-[40%] flex flex-col">
            <div className="flex-1 px-4">
              <h2 className="mb-2">Done</h2>
              {doneTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[180px] text-gray-400 flex items-center justify-center">
          할 일 없음
        </div>
      )}

      <div className="w-full flex justify-center">
        {(todos.length < 0 && doneTodos.length < 0) ||
        (todosCursor === null && doneTodosCursor === null) ? null : (
          <Button
            className="w-24 h-8 bg-white text-[#333] rounded-2xl hover:text-white"
            onClick={loadMore}
            disabled={isFetchingTodoNextPage || isFetchingDoneNextPage}
          >
            {isFetchingTodoNextPage || isFetchingDoneNextPage ? "로딩 중..." : "더 보기"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default GoalToDoContainer;
