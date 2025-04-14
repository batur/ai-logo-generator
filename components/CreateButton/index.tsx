import { Stars } from "../Icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Dimensions, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      className="overflow-hidden mx-6 mb-4 rounded-full absolute"
      style={{
        width: Dimensions.get("window").width - 48,
        bottom: insets.bottom + 12,
      }}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={["#943DFF", "#2938DC"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <View className="flex flex-row items-center justify-center gap-2 p-[17px]">
          <Text className="text-neutral-50">Create</Text>
          <Stars color={"#FAFAFA"} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CreateButton;
