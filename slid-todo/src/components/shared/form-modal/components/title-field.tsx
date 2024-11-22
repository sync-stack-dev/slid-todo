"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const TitleField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              placeholder="할 일을 입력하세요"
              className="border-none px-0 text-lg font-medium placeholder:text-muted-foreground/30"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
