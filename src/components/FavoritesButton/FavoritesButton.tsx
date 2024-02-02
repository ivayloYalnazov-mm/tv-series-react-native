/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { IconButton } from "../IconButton/IconButton";
import { useTheme } from "@react-navigation/native";
import { StyleProp, ViewStyle, ImageStyle } from "react-native";

interface FavoritesButtonProps {
  onPress: () => void;
  isActive: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const FavoritesButton = ({
  onPress,
  isActive,
  buttonStyle,
  imageStyle,
}: FavoritesButtonProps) => {
  const theme = useTheme();
  return (
    <IconButton
      onPress={onPress}
      iconSource={
        isActive
          ? require("../../assets/favorite-active.png")
          : require("../../assets/favorite-inactive.png")
      }
      buttonStyle={[
        {
          borderColor: isActive
            ? theme.colors.primary
            : theme.colors.placeholderText,
          borderWidth: 2,
        },
        buttonStyle,
      ]}
      imageStyle={imageStyle}
    />
  );
};

export { FavoritesButton };
