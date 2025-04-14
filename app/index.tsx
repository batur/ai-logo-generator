import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";

import {
  BackgroundGradient,
  CreateButton,
  Header,
  PromptBox,
  StatusIndicator,
  StyleList,
} from "@/components";
import { useGetJobs } from "@/hooks";

export default function Index() {
  const { data } = useGetJobs();

  console.log("Jobs data:", data?.map((job) => JSON.stringify(job)).join(", "));
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar showHideTransition="fade" barStyle="light-content" />
      <BackgroundGradient>
        <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="relative"
        >
          <View className="flex flex-col gap-6">
            <StatusIndicator />
            <PromptBox />
            <StyleList />
          </View>
        </ScrollView>
        <CreateButton />
      </BackgroundGradient>
    </SafeAreaView>
  );
}
