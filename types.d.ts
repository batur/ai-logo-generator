import { Timestamp } from "@react-native-firebase/firestore";

export interface Job {
  id: string;
  prompt: string;
  style_description: string;
  style_name: string;
  status: "processing" | "done" | "error";
  result_url: string;
  updated_at: Timestamp;
  created_at: Timestamp;
}

export interface Style {
  id: string;
  name: string;
  image_url: string;
  description: string;
}
