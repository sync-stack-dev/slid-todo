"use client";

import { useConfirmModal } from "@/stores/use-confirm-modal-store";

export const ConfirmModal = () => {
  const { isOpen, data, onConfirm, onClose } = useConfirmModal();

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 z-[9999] pointer-events-auto"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg min-w-[320px] p-6 z-[10000] pointer-events-auto">
        <div className="text-center font-medium mb-2">{data.title}</div>
        {data.description && (
          <div className="text-center text-gray-500 text-sm mb-4">{data.description}</div>
        )}
        <div className="flex justify-center gap-2">
          <button
            className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-md pointer-events-auto"
            onClick={onClose}
          >
            {data.cancelText || "취소"}
          </button>
          <button
            className={`px-4 py-2 text-sm text-white rounded-md pointer-events-auto ${
              data.variant === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : data.variant === "warning"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {data.confirmText || "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};
