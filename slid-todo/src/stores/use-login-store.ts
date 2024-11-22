import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie"; // 쿠키 라이브러리 임포트

interface LoginState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (token) => {
        set({ accessToken: token });
        if (token) {
          Cookies.set("accessToken", token, { expires: 7, path: "/" }); // 쿠키 설정
        } else {
          Cookies.remove("accessToken"); // 토큰이 없으면 쿠키 삭제
        }
      },
      setRefreshToken: (token) => {
        set({ refreshToken: token });
        if (token) {
          Cookies.set("refreshToken", token, { expires: 7, path: "/" }); // 쿠키 설정
        } else {
          Cookies.remove("refreshToken"); // 토큰이 없으면 쿠키 삭제
        }
      },
      logout: () => {
        set({ accessToken: null, refreshToken: null });
        Cookies.remove("accessToken"); // 로그아웃 시 쿠키 삭제
        Cookies.remove("refreshToken");
      },
    }),
    {
      name: "login-storage", // localStorage에 저장될 키 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }), // 저장할 상태 선택
    },
  ),
);
