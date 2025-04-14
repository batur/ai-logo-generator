import "../global.css";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import constants from "@/constants";
import { useEffect } from "react";
import firebase from "@/firebase";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    firebase.auth().signInAnonymously();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: constants.BG_COLOR,
          },
        }}
      />
    </QueryClientProvider>
  );
}
