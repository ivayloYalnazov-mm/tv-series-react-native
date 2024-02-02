import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableHighlight,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from "react-native";
import { iconButtonStyles } from "./IconButton.styles";

interface IconButtonProps {
  onPress: () => void;
  iconSource: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const IconButton = ({
  onPress,
  iconSource,
  buttonStyle,
  imageStyle,
}: IconButtonProps) => {
  const theme = useTheme();
  const styles = iconButtonStyles(theme);

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      testID="icon-button"
    >
      <Image
        source={iconSource}
        style={[styles.image, imageStyle]}
        testID="icon-image"
      />
    </TouchableHighlight>
  );
};

export { IconButton };
