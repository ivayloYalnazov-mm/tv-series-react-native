import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const pageErrorViewStyles = (theme: AppTheme) =>
  StyleSheet.create({
    errorText: {
      color: theme.colors.notification,
      fontSize: 24,
    },
    viewContainer: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
  });
