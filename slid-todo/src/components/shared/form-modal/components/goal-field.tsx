"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGoals } from "@/hooks/goals/use-goals";

export const GoalField = () => {
  const { control } = useFormContext();
  const { data: goalsData, isLoading: goalsLoading } = useGoals({
    enabled: true,
  });

  return (
    <FormField
      control={control}
      name="goal"
      render={({ field }) => (
        <FormItem>
          <FormLabel>목표</FormLabel>
          <FormControl>
            <Select
              value={field.value?.id?.toString() || "no-goals"}
              onValueChange={(value) => {
                if (value === "loading" || value === "no-goals") return;

                const selectedGoal = goalsData?.goals.find((g) => g.id === parseInt(value));
                if (selectedGoal) {
                  field.onChange({ id: selectedGoal.id, title: selectedGoal.title });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="목표를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {goalsLoading ? (
                  <SelectItem value="loading">로딩중...</SelectItem>
                ) : goalsData?.goals && goalsData.goals.length > 0 ? (
                  goalsData.goals.map((goal) => (
                    <SelectItem key={goal.id} value={goal.id.toString()}>
                      {goal.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-goals">목표가 없습니다</SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
