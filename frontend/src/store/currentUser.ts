import { User } from "@/types/models";
import { create } from "zustand";

interface CurrentUserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useCurrentUser = create<CurrentUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const currentUserStore = () => useCurrentUser.getState();