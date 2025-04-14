import { getStorage, ref } from "@react-native-firebase/storage";

const storage = getStorage();

const generateURL = (rawURL: string | undefined) => {
  if (!rawURL) {
    return "";
  }
  const httpReference = ref(storage, rawURL);
  return httpReference.fullPath;
};

export default { generateURL };
