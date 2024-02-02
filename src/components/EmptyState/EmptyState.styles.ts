import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const emptyStateStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: "center",
    },
    message: {
      color: theme.colors.text,
      fontSize: 20,
    },
  });
