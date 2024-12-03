import { create } from "zustand";

interface NoteState {
  formData: {
    title: string;
    content: string;
    linkUrl: string;
  };
  updateFormData: (data: Partial<NoteState["formData"]>) => void;
}

export const useNoteEditStore = create<NoteState>((set) => ({
  formData: {
    title: "",
    content: "",
    linkUrl: "",
  },
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
}));
