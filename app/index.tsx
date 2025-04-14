import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";

import {
  BackgroundGradient,
  CreateButton,
  Header,
  PromptBox,
  StatusIndicator,
  StyleList,
} from "@/components";
import { useGetJobs, useGetSingleJob, useGetStyles } from "@/hooks";
import { useEffect, useState } from "react";
import { useJobIdStore, useStylesStore } from "@/stores";

export default function Index() {
  const { data: stylesData } = useGetStyles();
  const { data: jobData } = useGetJobs();
  const { jobId } = useJobIdStore();
  const { data: singleJobData } = useGetSingleJob({
    jobId: jobId,
  });

  const { setStyles } = useStylesStore();

  useEffect(() => {
    if (stylesData) {
      setStyles(stylesData);
    }
  }, [stylesData, setStyles]);

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
            <StatusIndicator status={singleJobData?.status} />
            <PromptBox />
            <StyleList />
          </View>
        </ScrollView>
        <CreateButton />
      </BackgroundGradient>
    </SafeAreaView>
  );
}
