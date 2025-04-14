import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import { BackgroundGradient, Header, Icons } from "@/components";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import constants from "@/constants";
import { useGetSingleJob } from "@/hooks";
import { useLocalSearchParams } from "expo-router";
import utils from "@/utils";

export default function Index() {
  const { result } = useLocalSearchParams<{ result: string }>();
  const { data } = useGetSingleJob({
    jobId: result,
  });

  const copyToClipboard = async (prompt?: string) => {
    if (!prompt) return;

    await Clipboard.setStringAsync(prompt);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar showHideTransition="fade" barStyle="light-content" />
      <BackgroundGradient>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="relative"
        >
          <Header variant="secondary" />
          <View className=" aspect-square mx-6 rounded-2xl overflow-hidden">
            <Image
              source={utils.generateURL(data?.result_url)}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>

          <View className="flex flex-col mx-6 p-3 bg-zinc-800 rounded-xl mt-6 gap-3 overflow-hidden">
            <LinearGradient
              colors={["rgba(148, 61, 255, 0.05)", "rgba(41, 56, 220, 0.05)"]}
              locations={[0.2459, 1]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={{
                borderRadius: 8,
                display: "flex",
              }}
            >
              <View className="flex flex-row items-center justify-between">
                <Text className="text-neutral-50 text-[15px] font-bold leading-5 font-serif">
                  Prompt
                </Text>
                <TouchableOpacity
                  className="flex flex-row items-center justify-center gap-[6px]"
                  onPress={() => copyToClipboard(data?.prompt)}
                >
                  <Icons.Copy
                    width={16}
                    height={16}
                    color={constants.ZINC_400}
                  />
                  <Text className="text-zinc-400 text-[11px] font-serif">
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="text-neutral-50 text-base font-medium py-3 font-serif">
                {data?.prompt}
              </Text>
              {data?.style_name && (
                <View className="p-2 bg-zinc-800/0 rounded-full max-w-20">
                  <Text className="text-neutral-50 text-xs font-normal font-serif">
                    {data?.style_name}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </View>
        </ScrollView>
      </BackgroundGradient>
    </SafeAreaView>
  );
}
