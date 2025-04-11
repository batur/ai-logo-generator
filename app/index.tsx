import { Text, View } from "react-native";
import analytics from "@react-native-firebase/analytics";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const logEvent = async () => {
      await analytics().logEvent("screen_view", {
        screen_name: "Index",
        screen_class: "Index",
      });
    };

    logEvent();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
