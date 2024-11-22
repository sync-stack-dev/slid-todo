import { instance } from "@/lib/axios";
import { Goal } from "./types";

interface GoalsResponse {
  goals: Goal[];
  nextCursor: number | null;
  totalCount: number;
}

// 목표 목록 조회
export const getGoals = async () => {
  try {
    const response = await instance.get<GoalsResponse>("/goals");
    return response.data;
  } catch (error) {
    console.error("목표 목록 조회 실패:", error);
    throw error;
  }
};
