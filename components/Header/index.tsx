import { View, Text, TouchableOpacity } from "react-native";
import { Cancel } from "../Icons";
import constants from "@/constants";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

type HeaderProps = {
  variant?: "default" | "secondary";
};

const Header: React.FC<HeaderProps> = ({ variant = "default" }) => {
  const handleCancelPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    return router.canGoBack() ? router.back() : router.push("/");
  };

  if (variant === "default") {
    return (
      <View className="flex items-center justify-center py-3 mx-6 h-[60px]">
        <Text className="text-neutral-50 font-extrabold leading-snug text-[17px] font-serif">
          AI Logo
        </Text>
      </View>
    );
  }

  return (
    <View className=" justify-center flex py-4 mx-6 h-[60px]">
      <Text className="text-neutral-50 font-extrabold leading-7 text-[22px] font-serif">
        Your Design
      </Text>
      <TouchableOpacity
        className="absolute right-6"
        activeOpacity={0.7}
        onPress={handleCancelPress}
      >
        <Cancel color={constants.NEUTRAL_WHITE} width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
