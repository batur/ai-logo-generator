import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  getFirestore,
} from "@react-native-firebase/firestore";
import { Job } from "@/types";

const db = getFirestore();

export const usePostJobs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData: Omit<Job, "id">) => {
      const newJob = {
        ...jobData,
        createdAt: new Date(),
        status: "processing",
        result_url: "",
      };

      // Add the document to Firestore
      const docRef = await addDoc(collection(db, "jobs"), newJob);

      // Return the created job with its ID
      return {
        id: docRef.id,
        ...newJob,
      };
    },

    // After successful mutation, invalidate the jobs query to refresh the list
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  // Return the mutation object and a simplified createJob function
};

export default usePostJobs;
