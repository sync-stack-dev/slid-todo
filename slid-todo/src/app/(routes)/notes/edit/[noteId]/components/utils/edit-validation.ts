import * as z from "zod";

export const NoteEditSchema = z.object({
  title: z.string().min(1, "이름을 입력해주세요"),
  content: z.string().min(1, "이름을 입력해주세요"),
  linkUrl: z.string().min(1, "링크를 기입해주세요."),
});

export type NoteEditFormValues = z.infer<typeof NoteEditSchema>;
