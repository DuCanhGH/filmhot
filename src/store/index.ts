import create from "zustand";

import { User } from "@/shared/types";

interface Store {
  currentUser: null | undefined | User;

  setCurrentUser: (user: User | null) => void;
}

export const useStore = create<Store>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
}));
