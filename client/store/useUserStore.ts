import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
  projects?: {
    id: number;
    name: string;
    description: string;
    user_id: number;
  }[];
};

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  projects: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
