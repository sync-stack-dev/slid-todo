"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  import { SignupSchema, SignupFormValues } from "./utils/validation";


const SignupForm = () => {

  const isLoading = status === "pending"; // isLoading 
    
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", 
    },
    mode: 'onBlur', // 입력후 포커스 이동시 유효성 검사 하도록 설정.
  });

    return(
        <Form  {...form}>
          <form  className="w-full max-w-sm space-y-4">
             <div className="space-y-2">
             <FormField 
                control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="이름을 입력해 주세요"
                            className="h-12 rounded-xl"
                            onBlur={field.onBlur}
                            disabled={isLoading}
                            autoComplete="text"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
               />

              <FormField 
                control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="이메일을 입력해 주세요"
                            className="h-12 rounded-xl"
                            onBlur={field.onBlur}
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
                        <FormControl>
                          <PasswordInput
                            {...field}
                            placeholder="비밀번호를 입력해 주세요"
                            className="h-12 rounded-xl"
                            onBlur={field.onBlur}
                            disabled={isLoading}
                            autoComplete="password"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
               />

              <FormField 
                control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            placeholder="비밀번호를 다시 한 번 입력해 주세요"
                            className="h-12 rounded-xl"
                            onBlur={field.onBlur}
                            disabled={isLoading}
                            autoComplete="password"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
               />
             </div> 
             <SubmitButton isLoading={isLoading} />
             <div className="text-center text-sm text-muted-foreground">
          이미 회원이신가요?
          <Link href="/login" className="text-blue-500 hover:underline">
            로그인
          </Link>
        </div>   
          </form>
        </Form>    
    );
};

export default SignupForm; 

