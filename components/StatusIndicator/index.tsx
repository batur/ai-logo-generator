import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { Alert } from "../Icons";
import { useJobIdStore } from "@/stores";
import { useEffect } from "react";

type StatusIndicatorProps = {
  status?: "processing" | "done" | "error";
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const { setJobId } = useJobIdStore();

  useEffect(() => {
    if (status === "done") {
      setTimeout(() => {
        setJobId("");
      }, 5000);
    }
  }, [status]);

  if (status === "processing") {
    return (
      <View className="mx-6 flex flex-row">
        <View className="h-[70px] w-[70px] flex flex-row items-center justify-center p-4 bg-zinc-900 rounded-tl-2xl rounded-bl-2xl">
          <View className="w-6 h-6 rounded-full bg-neutral-50" />
        </View>
        <View className="flex flex-grow overflow-hidden rounded-tr-2xl rounded-br-2xl">
          <LinearGradient
            colors={["rgba(148, 61, 255, 0.05)", "rgba(41, 56, 220, 0.05)"]}
            locations={[0.2459, 1]} // 24.59% and 100%
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
              flex: 1, // or your size
              backgroundColor: "#27272A",
            }}
          >
            <View className="flex flex-col justify-center h-full gap-[2px] p-3">
              <Text className="text-neutral-50 text-base font-extrabold leading-tight">
                Creating Your Design
              </Text>
              <Text className="text-zinc-500 text-xs font-medium">
                Ready in 2 minutes
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View className="mx-6 flex flex-row bg-white rounded-2xl">
        <View className="h-[70px] w-[70px] flex flex-row items-center justify-center p-4  bg-red-500/70 rounded-tl-2xl rounded-bl-2xl">
          <Alert color={"#FAFAFA"} />
        </View>
        <View className="flex flex-col justify-center flex-grow gap-[2px] p-3 bg-red-500 rounded-tr-2xl rounded-br-2xl">
          <Text className="text-neutral-50 text-base font-extrabold leading-tight">
            Oops, something went wrong!
          </Text>
          <Text className="text-zinc-300 text-xs font-medium">
            Click to try again.
          </Text>
        </View>
      </View>
    );
  }

  if (status === "done") {
    return (
      <View className="mx-6 flex flex-row">
        <View className="h-[70px] w-[70px] flex flex-row items-center justify-center p-4 bg-white rounded-tl-2xl rounded-bl-2xl"></View>
        <View className="flex flex-grow overflow-hidden rounded-tr-2xl rounded-br-2xl">
          <LinearGradient
            colors={["#943DFF", "#2938DC"]}
            locations={[0.2459, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{ flex: 1 }}
          >
            <View className="flex flex-col justify-center h-full gap-[2px] p-3">
              <Text className="text-neutral-50 text-base font-extrabold leading-tight">
                Your Design is Ready!
              </Text>
              <Text className="text-zinc-300 text-xs font-medium">
                Tap to see it.
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
};

export default StatusIndicator;
