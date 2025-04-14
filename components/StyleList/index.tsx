import { View } from "react-native";

import { FlashList } from "@shopify/flash-list";

import { Style } from "@/types";
import { useStylesStore } from "@/stores";
import constants from "@/constants";

import Header from "./Header";
import Item from "./Item";
import Seperator from "./Seperator";

const List = () => {
  const { styles } = useStylesStore();

  return (
    <View className="flex flex-col gap-3">
      <Header />
      <FlashList
        className="px-6"
        estimatedItemSize={98}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        horizontal
        ItemSeparatorComponent={Seperator}
        renderItem={({ item }) => <Item item={item} />}
        data={
          [
            constants.NO_STYLE_ITEM,
            ...(styles
              ? [
                  ...styles.filter((style) => style.name === "Monogram"),
                  ...styles.filter((style) => style.name === "Abstract"),
                  ...styles.filter(
                    (style) =>
                      style.name !== "Monogram" && style.name !== "Abstract"
                  ),
                ]
              : []),
          ] as Style[]
        }
      />
    </View>
  );
};

export default List;
