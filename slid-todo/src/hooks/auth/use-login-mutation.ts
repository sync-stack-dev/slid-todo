import { useMutation } from "@tanstack/react-query";
import { useLoginStore } from "@/stores/use-login-store";
import { instance } from "@/lib/axios";
import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const useLoginMutation = () => {
  console.log("useLogin");
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) => {
      const response = await instance.post<LoginResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      useLoginStore.getState().setAccessToken(data.accessToken);
      useLoginStore.getState().setRefreshToken(data.refreshToken);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "로그인 중 오류가 발생했습니다.";
        throw new Error(errorMessage);
      }
      throw new Error("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
