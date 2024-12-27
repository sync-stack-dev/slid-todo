"use client";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModalType } from "@/stores/use-form-modal-store";

interface TitleFieldProps {
  type: ModalType; // optional 제거
}

export const TitleField = ({ type }: TitleFieldProps) => {
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
              placeholder={
                type === "goal"
                  ? "목표 제목을 입력해주세요."
                  : "할 일의 제목을 30자 이내로 입력해주세요."
              }
              className={`text-lg font-medium ${
                type !== "goal" ? "border-none px-0 placeholder:text-muted-foreground/30" : ""
              }`}
              data-cy="form-modal-title"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
