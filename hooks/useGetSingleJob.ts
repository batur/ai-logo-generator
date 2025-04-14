import { Job } from "@/types";
import { Firestore } from "@google-cloud/firestore";
import {
  collection,
  getDocs,
  query,
  getFirestore,
  onSnapshot,
  where,
  doc,
  getDoc,
} from "@react-native-firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const db = getFirestore();
const fetchJobs = async (jobId: string) => {
  const q = doc(db, "jobs", jobId);
  const querySnapshot = await getDoc(q);

  if (querySnapshot.exists) {
    return {
      id: querySnapshot.id,
      ...(querySnapshot.data() as Omit<Job, "id">),
    };
  } else {
    throw new Error("No such document!");
  }
};

const useGetSingleJob = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobs(jobId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!jobId && jobId.length > 0,
    staleTime: 500,
    refetchInterval: 500,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "jobs"),
      (snapshot) => {
        const jobs: Job[] = [];
        snapshot.forEach((doc) => {
          jobs.push({
            id: doc.id,
            ...(doc.data() as Omit<Job, "id">),
          });
        });
        queryClient.setQueryData(["job"], jobs);
      },
      (error) => {
        console.error("Error fetching jobs:", error);
        queryClient.setQueryData(["jobs"], []);
      }
    );

    return () => unsubscribe();
  }, [queryClient]);

  return query;
};

export default useGetSingleJob;
