import { useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";

interface Goals {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
  userId: number;
  teamId: string;
}

interface GoalsResponse {
  nextCursor: number;
  goals: Goals[];
  totalCount: number;
}

interface UseGoalsOptions {
  enabled?: boolean;
}

export const useGoals = (options: UseGoalsOptions = {}) => {
  return useQuery<GoalsResponse>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await instance.get("/goals");
      return response.data;
    },
    enabled: options.enabled,
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
