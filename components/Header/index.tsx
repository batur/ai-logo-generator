import { View, Text } from "react-native";

const Header = () => {
  return (
    <View className="flex items-center justify-center py-3 mx-6 h-[60px]">
      <Text className="text-neutral-50 font-extrabold leading-snug text-[17px]">
        AI Logo
      </Text>
    </View>
  );
};

export default Header;
