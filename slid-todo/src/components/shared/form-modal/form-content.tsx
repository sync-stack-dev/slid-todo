"use client";

import { ModalType } from "@/stores/use-form-modal-store";
import { ActiveField } from "./types";
import { TitleField } from "./components/title-field";
import { DoneField } from "./components/done-field";
import { AttachmentField } from "./components/attachment-field";
import { GoalField } from "./components/goal-field";

interface FormContentProps {
  type: ModalType;
  activeField: ActiveField;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  setActiveField: (field: ActiveField) => void;
}

export const FormContent = ({
  type,
  activeField,
  selectedFile,
  onFileSelect,
  onFileRemove,
  setActiveField,
}: FormContentProps) => {
  return (
    <div className="p-4 space-y-4">
      <TitleField />
      <DoneField />
      <AttachmentField
        activeField={activeField}
        selectedFile={selectedFile}
        onFileSelect={onFileSelect}
        onFileRemove={onFileRemove}
        setActiveField={setActiveField}
      />
      {type === "todo" && <GoalField />}
    </div>
  );
};
