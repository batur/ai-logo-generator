import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  getFirestore,
} from "@react-native-firebase/firestore";
import { Job } from "@/types";
import firebase from "@/firebase";
import { useJobIdStore } from "@/stores";

const db = getFirestore();

const callStartGeneration = async (id: string) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await fetch(
      "https://startgeneration-miqrltjika-uc.a.run.app",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: id,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Job started:", data);
      return data.jobId;
    } else {
      console.error("Error:", data);
    }
  } catch (err) {
    console.error("Request failed:", err);
  }
};

export const usePostJobs = () => {
  const { setJobId } = useJobIdStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      jobData: Pick<Job, "prompt" | "style" | "style_description">
    ) => {
      const newJob = {
        ...jobData,
        createdAt: new Date(),
        status: "processing",
        result_url: "",
      };

      // Add the document to Firestore
      const docRef = await addDoc(collection(db, "jobs"), newJob);

      callStartGeneration(docRef.id);

      // Return the created job with its ID
      return {
        id: docRef.id,
        ...newJob,
      };
    },

    // After successful mutation, invalidate the jobs query to refresh the list
    onSuccess: (data) => {
      setJobId(data.id);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });

  // Return the mutation object and a simplified createJob function
};

export default usePostJobs;
