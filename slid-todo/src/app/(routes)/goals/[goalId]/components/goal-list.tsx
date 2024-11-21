"use client";
import { Goal } from "@/actions/goal/types";

const GoalList = ({ goal }: { goal: Goal }) => {
  return <div>{goal.title}</div>;
};

export default GoalList;
