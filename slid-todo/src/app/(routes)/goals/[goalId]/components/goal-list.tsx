"use client";
import { Goal } from "@/types/goal";

const GoalList = ({ goal }: { goal: Goal }) => {
  return <div>{goal.title}</div>;
};

export default GoalList;
