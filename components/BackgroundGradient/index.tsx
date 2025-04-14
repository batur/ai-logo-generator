import React from "react";
import { Dimensions } from "react-native";
import { Image } from "expo-image";

const IMG = require("@/assets/images/back_gradient.png");

type BackgroundGradientProps = {
  children?: React.ReactNode;
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  children,
}) => {
  return (
    <>
      <Image
        source={IMG}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,

          zIndex: -1,
          flexGrow: 1,
        }}
        contentFit="cover"
      />
      {children}
    </>
  );
};

export default BackgroundGradient;
