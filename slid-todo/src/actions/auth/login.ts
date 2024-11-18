import { useLoginStore } from "@/stores/login";
import { instance } from "@/lib/axios";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export const signIn = async (data: SignInRequest) => {
  try {
    const response = await instance.post<SignInResponse>("/auth/login", data);
    console.log("받은 토큰:", response.data.accessToken); // 토큰이 제대로 오는지 확인
    useLoginStore.getState().setAccessToken(response.data.accessToken);
    useLoginStore.getState().setRefreshToken(response.data.refreshToken);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "로그인에 실패했습니다.");
  }
};
