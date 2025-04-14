import { usePromptStore, useStylesStore } from "@/stores";
import { Stars } from "../Icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Dimensions, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import constants from "@/constants";
import { usePostJobs } from "@/hooks";
import * as Haptics from "expo-haptics";

const CreateButton = () => {
  const insets = useSafeAreaInsets();
  const { prompt, isSubmitting, clearPrompt, clearSubmitting } =
    usePromptStore();
  const { styles, selectedStyleId } = useStylesStore();
  const { mutateAsync, isPending } = usePostJobs();

  const isValidPrompt = !(prompt.length > 5);

  const onSubmit = async () => {
    if (isValidPrompt) {
      return;
    }

    const style = styles.find((style) => style.id === selectedStyleId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await mutateAsync({
        prompt: prompt,
        style_name: style?.name || "",
        style_description: style?.description || "",
      });
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.error("Error creating job:", error);
    }

    clearPrompt();
    clearSubmitting();
    return;
  };

  return (
    <TouchableOpacity
      disabled={isValidPrompt}
      className="overflow-hidden mx-6 mb-4 rounded-full absolute disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        width: Dimensions.get("window").width - 48,
        bottom: insets.bottom + 12,
      }}
      activeOpacity={0.7}
      onPress={onSubmit}
    >
      <LinearGradient
        colors={["#943DFF", "#2938DC"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <View className="flex flex-row items-center justify-center gap-2 p-[17px]">
          <Text className="text-neutral-50 font-serif">Create</Text>
          <Stars color={constants.NEUTRAL_WHITE} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CreateButton;
