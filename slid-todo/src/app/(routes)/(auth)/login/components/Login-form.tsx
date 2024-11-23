"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

//import { Button } from "@/components/ui/button";
import SubmitButton from "./Submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/hooks/auth/use-login-mutation"; // 변경된 부분
import { loginSchema, LoginFormValues } from "./utils/validation"; // 유효성검사 코드, 분리된 파일에서 가져오기

// const loginSchema = z.object({
//   email: z.string().email("올바른 이메일 주소를 입력해주세요"),
//   password: z.string().min(1, "비밀번호를 입력해주세요"),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { mutate: login, status, isError, error } = useLoginMutation(); // 변경된 부분

  const isLoading = status === "pending"; // isLoading 정의
  const { mutate: login, status, isError, error } = useLoginMutation(); // 변경된 부분

  const isLoading = status === "pending"; // isLoading 정의

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "", // 기본값 설정
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: () => {
        router.push("/");
        router.refresh();
        toast.success("로그인 성공!");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="이메일을 입력해 주세요"
                    className="h-12 rounded-xl"
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    className="h-12 rounded-xl"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton isLoading={isLoading} />
        <SubmitButton isLoading={isLoading} />
        {/* <Button
          type="submit"
          className="w-full h-12 bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          로그인하기 
        </Button>  ui 컴포넌트 분리화 */}

        <div className="text-center text-sm text-muted-foreground">
          아직 회원이 아니신가요?
          <Link href="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
