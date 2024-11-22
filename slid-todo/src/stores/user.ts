import { create } from "zustand";
import { instance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  email: string;
  name: string;
}

// Zustand store - 클라이언트 상태 관리
interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// React Query hooks - 서버 상태 관리
export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await instance.get<User>("/user");
      // 서버에서 받아온 데이터를 Zustand store에 저장
      useUserStore.getState().setUser(data);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
};
