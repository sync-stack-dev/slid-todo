"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { FormProvider } from "react-hook-form";
import { FormHeader } from "./form-header";
import { FormContent } from "./form-content";
import { FormFooter } from "./form-footer";
import { useFormModalLogic } from "./use-form-modal";

export const FormModal = () => {
  const { isOpen, data, onClose } = useFormModal();
  const { onOpen: openConfirm } = useConfirmModal();
  const {
    form,
    activeField,
    selectedFile,
    isValid,
    setActiveField,
    handleFileSelect,
    handleFileRemove,
    handleSubmit,
  } = useFormModalLogic();

  if (!isOpen || !data) return null;

  const handleCloseAttempt = (open: boolean) => {
    if (!open) {
      openConfirm({
        title: "정말 나가시겠어요?",
        description: "작성된 내용이 모두 삭제됩니다.",
        confirmText: "나가기",
        variant: "danger",
        onConfirm: () => {
          onClose();
        },
      });
      return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseAttempt}>
      <DialogContent className="p-0 gap-0 w-full" data-cy="form-modal">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormHeader
              type={data.type}
              mode={data.mode}
              onClose={() => handleCloseAttempt(false)}
            />
            <FormContent
              type={data.type}
              mode={data.mode}
              activeField={activeField}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              setActiveField={setActiveField}
            />
            <FormFooter mode={data.mode} isValid={isValid} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
