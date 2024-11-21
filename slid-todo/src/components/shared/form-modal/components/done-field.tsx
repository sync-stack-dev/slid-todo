"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export const DoneField = () => {
  const form = useFormContext();
  const { control } = form;

  return (
    <FormField
      control={control}
      name="done"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value || false}
              onCheckedChange={(checked) => {
                console.log("Checkbox changed to:", checked);
                field.onChange(checked);
                form.setValue("done", checked, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </FormControl>
          <div className="text-sm font-medium leading-none">완료된 할 일</div>
        </FormItem>
      )}
    />
  );
};
