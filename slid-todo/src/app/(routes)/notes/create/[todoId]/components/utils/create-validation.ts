import * as z from "zod";

export const NoteCreateSchema = z.object({
  todoId: z.number(),
  title: z.string().min(3, "제목을 입력해 주세요"),
  //<p></p>의 기본 문법이 editor에 포함되어 최소 글자를 늘림.
  content: z.string().min(10, "내용을 입력해 주세요"),
  linkUrl: z.string().nullable(),
});

export type NoteCreateFormValues = z.infer<typeof NoteCreateSchema>;
