import { useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Goals {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
  userId: number;
  teamId: string;
}

interface GoalResponse {
  data: Goals;
}

interface ProgressResponse {
  data: {
    progress: number;
  };
}

interface GoalWithProgress extends Goals {
  progress: number;
}

export const useGoal = (goalId: number) => {
  const router = useRouter();

  return useQuery({
    queryKey: ["goals", goalId],
    queryFn: async () => {
      try {
        // 목표 정보 요청
        const goalResponse: GoalResponse = await instance.get(`/goals/${goalId}`);
        console.log("Goal Response:", goalResponse.data);

        // 진행률 정보 요청
        const progressResponse: ProgressResponse = await instance.get(`/todos/progress`, {
          params: { goalId },
        });
        console.log("Progress Response:", progressResponse.data);

        // 두 데이터 합치기
        const result = {
          ...goalResponse.data,
          progress: progressResponse.data?.progress ?? 0,
        } as GoalWithProgress;

        console.log("Final Combined Data:", result);

        return result;
      } catch (error: any) {
        if (error.response?.status === 404) {
          toast.error("존재하지 않는 목표입니다.");
          router.push("/");
          throw new Error("목표를 찾을 수 없습니다.");
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
