"use client";
import React from "react";
import { GoalHeader } from "./goal-header";
import { Goal } from "@/actions/goal/types";

const GoalList = ({ goal }: { goal: Goal }) => {
  return (
    <div>
      <GoalHeader goal={goal} />
    </div>
  );
};

export default GoalList;
