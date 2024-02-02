import React from "react";
import { Text, View } from "react-native";
import { pageErrorViewStyles } from "./PageErrorView.styles";
import { useTheme } from "@react-navigation/native";

interface PageErrorViewProps {
  errorText: string;
}

const PageErrorView = ({ errorText }: PageErrorViewProps) => {
  const theme = useTheme();
  const styles = pageErrorViewStyles(theme);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
};

export { PageErrorView };
