import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const iconButtonStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.colors.background,
      borderRadius: 50,
      height: 50,
      justifyContent: "center",
      width: 50,
    },
    image: {
      height: 32,
      width: 32,
    },
  });
