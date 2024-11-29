import { Goal } from "@/types/goal";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GoalState {
  curGoal: Goal | null;
  setCurGoal: (goal: Goal) => void;
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set) => ({
      curGoal: null,
      setCurGoal: (goal) => set({ curGoal: goal }),
    }),
    {
      name: "goal-storage",
    },
  ),
);
