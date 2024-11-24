import { useMutation } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import axios from "axios";

interface SignupRequest {
    email: string;
    name: string;
    password: string;
  }

interface SignupResponse {
    id: number,
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;    
} 

export const useSignupMutation = () => {
    return useMutation<SignupResponse, Error, SignupRequest>({
        mutationFn: async (data: SignupRequest) => {
            const response = await instance.post<SignupResponse>("/user", data);
            return response.data; 
        },
       onError: (error) => {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
            throw new Error(errorMessage);
        }
        throw new Error("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
       },
    });
};