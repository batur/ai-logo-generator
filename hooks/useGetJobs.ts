import { Job } from "@/types";
import {
  collection,
  getDocs,
  query,
  getFirestore,
  onSnapshot,
} from "@react-native-firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const db = getFirestore();
const fetchJobs = async () => {
  const q = query(collection(db, "jobs"));
  const querySnapshot = await getDocs(q);

  const jobs: Job[] = [];
  querySnapshot.forEach((doc) => {
    jobs.push({
      id: doc.id,
      ...(doc.data() as Omit<Job, "id">),
    });
  });

  return jobs;
};

const useGetJobs = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
        queryClient.setQueryData(["jobs"], jobs);
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

export default useGetJobs;
