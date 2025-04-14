import { View, Text, TouchableOpacity } from "react-native";

import { Slash } from "../Icons";

const Item = () => {
  return (
    <TouchableOpacity
      className="flex flex-col items-center justify-center gap-[6px]"
      activeOpacity={0.7}
    >
      <View className="flex items-center justify-center p-[25px] w-[90px] h-[90px] aspect-square rounded-2xl border-2 border-neutral-50">
        <Slash color={"#FAFAFA"} width={40} height={40} />
      </View>
      <Text className="text-neutral-50 font-extrabold text-[13px] leading-[18px]">
        No Style
      </Text>
    </TouchableOpacity>
  );
};

export default Item;
