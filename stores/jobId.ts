import { create } from "zustand";

type JobIdStore = {
  jobId: string;
  setJobId: (jobId: string) => void;
};

const useJobIdStore = create<JobIdStore>((set) => ({
  jobId: "",
  setJobId: (jobId: string) => set({ jobId }),
}));

export default useJobIdStore;
