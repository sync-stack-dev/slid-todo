import * as z from "zod";

export const NoteEditSchema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요."),
  content: z.string().min(1, "내용을 입력해 주세요."),
  linkUrl: z.string().min(1, "링크를 기입해 주세요."),
});

export type NoteEditFormValues = z.infer<typeof NoteEditSchema>;
