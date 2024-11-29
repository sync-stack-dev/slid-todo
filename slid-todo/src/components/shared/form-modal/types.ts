import { z } from "zod";

export const schema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 필수입니다." })
    .max(30, { message: "제목은 최대 30자입니다." }),
  description: z.string().optional(),
  done: z.boolean().default(false),
  fileUrl: z.string().optional(),
  linkUrl: z.string().optional(),
  goal: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional()
    .nullable(),
});

export const goalSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 필수입니다." })
    .max(30, { message: "제목은 최대 30자입니다." }),
});

export type FormSchema = z.infer<typeof schema>;
export type GoalFormSchema = z.infer<typeof goalSchema>;
export type ModalType = "todo" | "note" | "goal";
export type ModalMode = "create" | "edit";
export type ActiveField = "file" | "link" | null;
