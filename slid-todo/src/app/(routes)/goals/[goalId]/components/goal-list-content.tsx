"use client";

import { useGoalTodosInfinite } from "@/hooks/goals/use-goal-todos";
import { useParams } from "next/navigation";
import { TodoList } from "@/components/shared/todo-list";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { devLog } from "@/utils/dev-log";

export const GoalListContent = () => {
  const { goalId } = useParams();
  const { ref: todoRef, inView: todoInView } = useInView();
  const { ref: doneRef, inView: doneInView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGoalTodosInfinite(
    Number(goalId),
    false,
  );
  const {
    data: doneData,
    fetchNextPage: fetchDoneNextPage,
    hasNextPage: hasDoneNextPage,
    isFetchingNextPage: isFetchingDoneNextPage,
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

  useEffect(() => {
    if (data) {
      devLog("Current goalId:", goalId);
      devLog("Fetched data:", data.pages);
      data.pages.forEach((page, index) => {
        devLog(`Page ${index} todos:`, page.todos);
      });
    }
    if (doneData) {
      devLog("Done data:", doneData.pages);
      doneData.pages.forEach((page, index) => {
        devLog(`Done Page ${index}:`, page.todos);
      });
    }
  }, [data, doneData, goalId]);

  const todos = data?.pages.flatMap((page) => page.todos) || [];
  const doneTodos = doneData?.pages.flatMap((page) => page.todos) || [];

  return (
    <div className="mt-4 flex flex-col lg:flex-row gap-4 max-w-[1200px]">
      <div className="w-full bg-white rounded-lg p-4">
        <h2>Todo</h2>
        <TodoList todos={todos} observerRef={todoRef} isLoading={isFetchingNextPage} />
      </div>
      <div className="w-full bg-slate-200 rounded-lg p-4">
        <h2>Done</h2>
        <TodoList todos={doneTodos} observerRef={doneRef} isLoading={isFetchingDoneNextPage} />
      </div>
    </div>
  );
};
