import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useLoginStore } from "@/stores/use-login-store";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 토큰 재발급 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = useLoginStore.getState().refreshToken;

    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    const response = await axios.post<{ accessToken: string }>(
      `${BASE_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const newAccessToken = response.data.accessToken;
    useLoginStore.getState().setAccessToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    useLoginStore.getState().logout();
    throw error;
  }
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = useLoginStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    // 토큰 재발급 로직
    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return instance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 네트워크 에러 처리
    if (!error.response) {
      return Promise.reject(new Error("네트워크 연결을 확인해주세요."));
    }

    // 원본 에러 객체를 그대로 전달
    return Promise.reject(error);
  },
);
