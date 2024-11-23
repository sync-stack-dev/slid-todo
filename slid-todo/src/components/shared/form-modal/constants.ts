import { ModalType, ModalMode } from "./types";

export const FORM_TITLES: Record<ModalType, Record<ModalMode, string>> = {
  todo: {
    create: "할 일 생성",
    edit: "할 일 수정",
  },
  note: {
    create: "노트 생성",
    edit: "노트 수정",
  },
  goal: {
    create: "목표 생성",
    edit: "목표 수정",
  },
};

export const PLACEHOLDER_TEXT = {
  title: "제목을 입력해주세요",
  linkUrl: "링크를 입력해주세요",
  fileUrl: "파일을 드래그하여 업로드하세요",
};
