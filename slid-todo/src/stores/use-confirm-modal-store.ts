import { create } from "zustand";

interface ConfirmModalData {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

interface ConfirmModalStore {
  isOpen: boolean;
  data: ConfirmModalData | null;
  onConfirm?: () => void;
  onOpen: (data: ConfirmModalData & { onConfirm: () => void }) => void;
  onClose: () => void;
}

export const useConfirmModal = create<ConfirmModalStore>((set) => ({
  isOpen: false,
  data: null,
  onConfirm: undefined,
  onOpen: ({ onConfirm, ...data }) =>
    set({
      isOpen: true,
      data,
      onConfirm,
    }),
  onClose: () =>
    set({
      isOpen: false,
      data: null,
      onConfirm: undefined,
    }),
}));
