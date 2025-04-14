import { create } from "zustand";

interface PromptStore {
  prompt: string;
  isSubmitting: boolean;
  setPrompt: (prompt: string) => void;
  clearPrompt: () => void;
  setSubmitting: () => void;
  clearSubmitting: () => void;
}

const usePromptStore = create<PromptStore>((set) => ({
  prompt: "",
  isSubmitting: false,
  setPrompt: (prompt) => set({ prompt }),
  clearPrompt: () => set({ prompt: "" }),
  setSubmitting: () => set({ isSubmitting: true }),
  clearSubmitting: () => set({ isSubmitting: false }),
}));

export default usePromptStore;
