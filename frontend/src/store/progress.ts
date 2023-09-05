import { sleep } from "@/utils/sleep";
import { create } from "zustand";

interface ProgressStore {
  progress: number;
  show: boolean;
  setProgress: (progress: number) => void;
  complete(): void;
}

export const useProgress = create<ProgressStore>((set) => ({
  progress: 0,
  show: false,
  setProgress: async (progress) => {
    set({ progress, show: true });
    await sleep(100);
  },
  complete: async () => {
    set({ progress: 100, show: true });
    await sleep(300);
    set({ show: false });
    await sleep(100);
    set({ progress: 0 });
  },
}));

export const progressStore = useProgress.getState();