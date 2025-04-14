import { View } from "react-native";

import { FlashList } from "@shopify/flash-list";

import Header from "./Header";
import Item from "./Item";
import Seperator from "./Seperator";

const List = () => {
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
        renderItem={Item}
        data={[
          { id: "no", name: "No Style" },
          { id: "no1", name: "No Style" },
          { id: "no2", name: "No Style" },
          { id: "no3", name: "No Style" },
        ]}
      />
    </View>
  );
};

export default List;
