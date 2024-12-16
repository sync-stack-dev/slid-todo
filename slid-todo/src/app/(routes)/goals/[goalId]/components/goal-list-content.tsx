"use client";

import { useGoalTodosInfinite } from "@/hooks/goals/use-goal-todos";
import { useParams } from "next/navigation";
import { TodoList } from "@/components/shared/todo-list";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/shared/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { useFormModal } from "@/stores/use-form-modal-store";
const GoalListContent = () => {
  const { goalId } = useParams();
  const { ref: todoRef, inView: todoInView } = useInView();
  const { ref: doneRef, inView: doneInView } = useInView();
  const { onOpen: onOpenFormModal } = useFormModal();
  const { createTodo } = useTodoActions();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useGoalTodosInfinite(
    Number(goalId),
    false,
  );

  const {
    data: doneData,
    fetchNextPage: fetchDoneNextPage,
    hasNextPage: hasDoneNextPage,
    isFetchingNextPage: isFetchingDoneNextPage,
    status: doneStatus,
  } = useGoalTodosInfinite(Number(goalId), true);

  useEffect(() => {
    if (todoInView && hasNextPage) {
      fetchNextPage();
    }
  }, [todoInView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (doneInView && hasDoneNextPage) {
      fetchDoneNextPage();
    }
  }, [doneInView, hasDoneNextPage, fetchDoneNextPage]);

  const todos = data?.pages.flatMap((page) => page.todos) || [];
  const doneTodos = doneData?.pages.flatMap((page) => page.todos) || [];
  if (status === "pending" || doneStatus === "pending") {
    return null;
  }
  const handleOpenFormModal = () => {
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
          id: Number(goalId),
          title: "",
        },
      },
      onSubmit: (data) => {
        createTodo(data);
      },
    });
  };
  return (
    <div className="mt-4 flex flex-col lg:flex-row gap-4 max-w-[1200px] h-full">
      <div className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 h-[600px] flex flex-col">
        <div className="flex justify-between items-center px-4 h-10">
          <h2>Todo</h2>
          <Button
            variant="default"
            className="bg-transparent text-blue-600 dark:text-slate-400 text-sm hover:bg-transparent hover:text-blue-600 dark:hover:text-slate-200 p-0 transition-colors"
            onClick={handleOpenFormModal}
          >
            + 할 일 추가
          </Button>
        </div>
        <ScrollArea className="flex-1 px-4">
          <TodoList todos={todos} observerRef={todoRef} isLoading={isFetchingNextPage} />
        </ScrollArea>
      </div>
      <div className="w-full bg-slate-200 dark:bg-gray-900 rounded-lg p-4 h-[600px] flex flex-col">
        <div className="flex justify-between items-center px-4 h-10">
          <h2>Done</h2>
        </div>
        <ScrollArea className="flex-1 px-4">
          <TodoList todos={doneTodos} observerRef={doneRef} isLoading={isFetchingDoneNextPage} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default GoalListContent;
