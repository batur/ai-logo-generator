module.exports = {
  expo: {
    name: "ai-logo-generator",
    slug: "ai-logo-generator",
    version: "0.1.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    updates: {
      url: "https://u.expo.dev/8ea7c32e-cc64-4d29-8937-d3f74075c6d4",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.example.aiLogoGenerator",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_FILE_IOS ?? "./GoogleService-Info.plist",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      googleServicesFile:
        process.env.GOOGLE_SERVICES_FILE_ANDROID ?? "./google-services.json",
      package: "com.example.aiLogoGenerator",
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: [
      "expo-router",
      "@react-native-firebase/app",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "node_modules/@expo-google-fonts/manrope/200ExtraLight/Manrope_200ExtraLight.ttf",
            "node_modules/@expo-google-fonts/manrope/300Light/Manrope_300Light.ttf",
            "node_modules/@expo-google-fonts/manrope/400Regular/Manrope_400Regular.ttf",
            "node_modules/@expo-google-fonts/manrope/500Medium/Manrope_500Medium.ttf",
            "node_modules/@expo-google-fonts/manrope/600SemiBold/Manrope_600SemiBold.ttf",
            "node_modules/@expo-google-fonts/manrope/700Bold/Manrope_700Bold.ttf",
            "node_modules/@expo-google-fonts/manrope/800ExtraBold/Manrope_800ExtraBold.ttf",
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "8ea7c32e-cc64-4d29-8937-d3f74075c6d4",
      },
    },
    owner: "paxtartarica",
  },
};
