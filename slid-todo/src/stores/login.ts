import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      logout: () => set({ accessToken: null, refreshToken: null }),
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
