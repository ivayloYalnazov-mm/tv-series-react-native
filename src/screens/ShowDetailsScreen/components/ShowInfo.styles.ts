import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const ShowInfoStyles = (theme: AppTheme) =>
  StyleSheet.create({
    infoContainer: {
      padding: 10,
    },
    infoText: {
      color: theme.colors.text,
      fontSize: 16,
      marginBottom: 5,
    },
    linkButton: {
      alignSelf: "flex-start",
      marginTop: 10,
    },
    linkText: {
      color: theme.colors.primary,
      fontSize: 16,
      textDecorationLine: "underline",
    },
  });
