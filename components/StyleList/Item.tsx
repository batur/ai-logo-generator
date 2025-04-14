import { View, Text, TouchableOpacity } from "react-native";

import cn from "classnames";
import { getStorage, ref } from "@react-native-firebase/storage";

import { Slash } from "../Icons";
import { Style } from "@/types";
import { Image } from "expo-image";
import { useStylesStore } from "@/stores";
import { memo, useCallback } from "react";

const storage = getStorage();

type Props = {
  item: Style;
};

const Item: React.FC<Props> = ({ item }) => {
  const { setSelectedStyle, selectedStyleId } = useStylesStore();
  const isNoStyle = item.id === "0" || item.name === "No Style";

  const imageURL = useCallback((rawURL: string) => {
    const httpReference = ref(storage, rawURL);
    return httpReference.fullPath;
  }, []);

  const onItemPress = useCallback((id: string) => {
    setSelectedStyle(id);
  }, []);

  return (
    <TouchableOpacity
      className="flex flex-col items-center justify-center gap-[6px]"
      activeOpacity={0.7}
      onPress={() => onItemPress(item.id)}
    >
      <View
        className={cn(
          "flex items-center justify-center overflow-hidden w-[90px] h-[90px] aspect-square rounded-2xl",
          {
            "border-2 border-neutral-50": item.id === selectedStyleId,
          }
        )}
      >
        {isNoStyle ? (
          <Slash color={"#FAFAFA"} width={40} height={40} />
        ) : (
          <Image
            source={imageURL(item.image_url)}
            style={{
              width: 90,
              height: 90,
              borderRadius: 16,
            }}
          />
        )}
      </View>

      <Text className="text-neutral-50 font-extrabold text-[13px] leading-[18px]">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Item);
