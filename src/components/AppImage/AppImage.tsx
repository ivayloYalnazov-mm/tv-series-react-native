import React from "react";
import { Image, ImageProps, ImageURISource } from "react-native";

const AppImage = ({ source, ...rest }: ImageProps) => {
  return (
    <Image
      {...rest}
      source={
        (source as ImageURISource)?.uri
          ? source
          : require("../../assets/image-fallback.png")
      }
      testID="app-image"
    />
  );
};

export { AppImage };
