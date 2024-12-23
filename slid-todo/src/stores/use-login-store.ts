import { create } from "zustand";
import Cookies from "js-cookie";

interface LoginState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => void;
}

export const useLoginStore = create<LoginState>()((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      Cookies.set("accessToken", token, { expires: 7, path: "/" });
    } else {
      Cookies.remove("accessToken");
    }
  },
  setRefreshToken: (token) => {
    set({ refreshToken: token });
    if (token) {
      Cookies.set("refreshToken", token, { expires: 7, path: "/" });
    } else {
      Cookies.remove("refreshToken");
    }
  },
  logout: () => {
    set({ accessToken: null, refreshToken: null });
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },
}));
