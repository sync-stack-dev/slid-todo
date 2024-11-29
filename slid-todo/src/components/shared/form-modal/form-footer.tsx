"use client";
import { Button } from "@/components/ui/button";
import { ModalMode } from "./types";

interface FormFooterProps {
  mode: ModalMode;
  isValid: boolean;
}

export const FormFooter = ({ mode, isValid }: FormFooterProps) => {
  return (
    <div className="p-4 border-t">
      <Button
        type="submit"
        className="w-full"
        disabled={!isValid}
        data-cy="form-modal-submit-button"
      >
        {mode === "create" ? "생성" : "수정"}
      </Button>
    </div>
  );
};
