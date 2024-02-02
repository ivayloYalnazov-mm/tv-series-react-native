import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { emptyStateStyles } from "./EmptyState.styles";

const EmptyState: React.FC = () => {
  const theme = useTheme();
  const styles = emptyStateStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No items available</Text>
    </View>
  );
};

export { EmptyState };
