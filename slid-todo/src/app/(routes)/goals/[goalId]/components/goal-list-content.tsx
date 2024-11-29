"use client";

import { useGoalTodosInfinite } from "@/hooks/goals/use-goal-todos";
import { useParams } from "next/navigation";
import { TodoList } from "@/components/shared/todo-list";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { Loading } from "@/components/shared/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
export const GoalListContent = () => {
  const { goalId } = useParams();
  const { ref: todoRef, inView: todoInView } = useInView();
  const { ref: doneRef, inView: doneInView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isTodoLoading, // isLoading 추가
  } = useGoalTodosInfinite(Number(goalId), false);

  const {
    data: doneData,
    fetchNextPage: fetchDoneNextPage,
    hasNextPage: hasDoneNextPage,
    isFetchingNextPage: isFetchingDoneNextPage,
    isLoading: isDoneLoading, // isLoading 추가
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

  const isLoading = isTodoLoading || isDoneLoading;

  if (isLoading) {
    return <Loading />;
  }

  const todos = data?.pages.flatMap((page) => page.todos) || [];
  const doneTodos = doneData?.pages.flatMap((page) => page.todos) || [];

  return (
    <div className="mt-4 flex flex-col lg:flex-row gap-4 max-w-[1200px] h-full">
      <div className="w-full bg-white rounded-lg p-4 h-[600px] flex flex-col">
        <h2 className="mb-4 ">Todo</h2>
        <ScrollArea className="flex-1 px-4">
          <TodoList todos={todos} observerRef={todoRef} isLoading={isFetchingNextPage} />
        </ScrollArea>
      </div>
      <div className="w-full bg-slate-200 rounded-lg p-4 h-[600px] flex flex-col">
        <h2 className="mb-4">Done</h2>
        <ScrollArea className="flex-1 px-4">
          <TodoList todos={doneTodos} observerRef={doneRef} isLoading={isFetchingDoneNextPage} />
        </ScrollArea>
      </div>
    </div>
  );
};
