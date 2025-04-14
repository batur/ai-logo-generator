import { Style } from "@/types";
import {
  collection,
  getDocs,
  query,
  getFirestore,
} from "@react-native-firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const db = getFirestore();
const fetchStyles = async () => {
  const q = query(collection(db, "styles"));
  const querySnapshot = await getDocs(q);

  const styles: Style[] = [];
  querySnapshot.forEach((doc) => {
    styles.push({
      id: doc.id,
      ...(doc.data() as Omit<Style, "id">),
    });
  });

  return styles;
};

const useGetJobs = () =>
  useQuery({
    queryKey: ["styles"],
    queryFn: fetchStyles,
    staleTime: 1000 * 60 * 60, // 1 hour in milliseconds
  });

export default useGetJobs;
