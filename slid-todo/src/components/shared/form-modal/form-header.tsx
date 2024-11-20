"use client";

import { DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { FORM_TITLES } from "./constants";
import { ModalType, ModalMode } from "./types";

interface FormHeaderProps {
  type: ModalType;
  mode: ModalMode;
  onClose: () => void;
}

export const FormHeader = ({ type, mode, onClose }: FormHeaderProps) => {
  return (
    <DialogHeader className="p-4 space-y-0">
      <DialogTitle>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">{FORM_TITLES[type][mode]}</h2>
        </div>
      </DialogTitle>
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" onClick={onClose} />
        <span className="sr-only">Close</span>
      </DialogClose>
      <DialogDescription className="sr-only">
        {type === "todo" ? "할 일을 생성하거나 수정합니다" : "노트를 생성하거나 수정합니다"}
      </DialogDescription>
    </DialogHeader>
  );
};
