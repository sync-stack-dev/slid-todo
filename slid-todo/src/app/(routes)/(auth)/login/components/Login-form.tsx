"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import SubmitButton from "./Submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useLoginMutation } from "@/hooks/auth/use-login-mutation"; // 변경된 부분
import { loginSchema, LoginFormValues } from "./utils/validation"; // 유효성검사 코드, 분리된 파일에서 가져오기

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: login, status, isError, error } = useLoginMutation();
  const isLoading = status === "pending";

  // 회원가입 후 URL에서 이메일 가져오기.
  const emailFromQuery = searchParams.get("email") || "";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "", // 기본값 설정
      password: "",
    },
    mode: "onBlur", // 입력후 포커스 이동시 유효성 검사 하도록 설정.
  });

  useEffect(() => {
    if (emailFromQuery) {
      form.setValue("email", emailFromQuery); // 이메일 값이 있을 때만 설정
    }
  }, [emailFromQuery, form]);

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: () => {
        router.push("/dashboard");
        router.refresh();
        toast.success("로그인 성공!");
      },
      onError: (error: any) => {
        if (error) {
          // console.log("에러 응답 데이터:", error.response.data);
          // 가입되지 않은 이메일 로그인 시도 응답 메세지
          form.setError("email", { message: error.response.data.message });
        }

        toast.error(error.response.data.message);
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
                <FormControl>
                  <Input
                    {...field}
                    placeholder="이메일을 입력해 주세요"
                    className="h-12 rounded-xl"
                    onBlur={field.onBlur}
                    disabled={isLoading}
                    autoComplete="email"
                    role="email"
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
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="비밀번호를 입력해 주세요"
                    className="h-12 rounded-xl"
                    onBlur={field.onBlur}
                    role="password"
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
        <div className="text-center text-sm text-muted-foreground flex gap-2 justify-center">
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
