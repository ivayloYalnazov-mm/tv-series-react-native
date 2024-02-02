import React from "react";
import { ActivityIndicator, View } from "react-native";
import { pageLoadingIndicatorStyles } from "./PageLoadingIndicator.styles";
import { useTheme } from "@react-navigation/native";

const PageLoadingIndicator = () => {
  const theme = useTheme();

  return (
    <View style={pageLoadingIndicatorStyles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        testID="loading-indicator"
      />
    </View>
  );
};

export { PageLoadingIndicator };
