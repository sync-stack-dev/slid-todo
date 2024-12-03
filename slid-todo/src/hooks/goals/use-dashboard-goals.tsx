"use client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";

// 목표 데이터 타입
interface Goal {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  teamId: string;
  progress?: number; // 진행률 추가
}

// 목표 리스트 응답 타입
interface GoalsResponse {
  goals: Goal[];
  nextCursor: number;
  totalCount: number;
}

// 진행률 응답 타입
interface ProgressResponse {
  progress: number;
}

// 기존 훅에 진행률 및 목표별 Todo 요청 추가
export const useGoalListInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["goals", "infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      // 목표 리스트 요청
      const { data } = await instance.get<GoalsResponse>("/goals", {
        params: { cursor: pageParam || undefined, size: 2 }, // 페이지 크기 설정
      });

      // 각 목표에 대한 진행률 및 Todo 요청 병합
      const goalsWithDetails = await Promise.all(
        data.goals.map(async (goal) => {
          // 진행률 요청
          const { data: progressResponse } = await instance.get<ProgressResponse>(
            "/todos/progress",
            {
              params: { goalId: goal.id },
            },
          );

          return {
            ...goal,
            progress: progressResponse.progress,
          };
        }),
      );

      return { ...data, goals: goalsWithDetails }; // 원래 데이터에 수정된 목표 데이터 반환
    },
    getNextPageParam: (lastPage) => (lastPage.nextCursor !== 0 ? lastPage.nextCursor : undefined),
    initialPageParam: 0,
  });
};

// 전체 할일의 진행률 조회 대시보드: 프로그레스 데이터
export const useProgress = () => {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const ProgressResponse = await instance.get("/todos/progress");
      return ProgressResponse.data.progress;
    },
  });
};
