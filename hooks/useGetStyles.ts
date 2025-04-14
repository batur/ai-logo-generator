import {
  collection,
  getDocs,
  query,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const db = getFirestore();
const fetchStyles = async () => {
  const q = query(collection(db, "jobs"));
  const querySnapshot = await getDocs(q);

  const jobs: any[] = [];
  querySnapshot.forEach((doc) => {
    jobs.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return jobs;
};

const useGetJobs = () =>
  useQuery({
    queryKey: ["styles"],
    queryFn: fetchStyles,
    staleTime: 1000 * 60 * 60, // 1 hour in milliseconds
  });

export default useGetJobs;
