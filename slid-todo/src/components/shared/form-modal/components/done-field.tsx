"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export const DoneField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="done"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="text-sm font-medium leading-none">완료된 할 일</div>
        </FormItem>
      )}
    />
  );
};
