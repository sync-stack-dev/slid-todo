import * as z from "zod";

export const NoteCreateSchema = z
  .object({
    // 이름 입력여부 확인, 유효성 검사
    name: z.string().min(1, "이름을 입력해주세요"),
    // 이메일 입력여부 확인, 유효성 검사
    email: z.string().email("올바른 이메일 주소를 입력해주세요"),
    // 비밀번호 8자리 이상 유효성 검사
    password: z.string().min(8, "비밀번호가 8자 이상이 되도록 해 주세요"),
    // 비밀번호 확인 일치여부 유효성 검사
    confirmPassword: z.string().min(8, "비밀번호가 8자 이상이 되도록 해 주세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 비밀번호 확인 필드에 오류 메시지 추가
  });

export type NoteCreateFormValues = z.infer<typeof NoteCreateSchema>;
