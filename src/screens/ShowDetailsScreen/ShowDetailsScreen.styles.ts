import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const showDetailsScreenStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      justifyContent: "center",
      margin: 10,
      padding: 10,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 18,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    description: {
      color: theme.colors.placeholderText,
      fontSize: 16,
      lineHeight: 24,
      paddingBottom: 20,
      paddingHorizontal: 15,
      paddingTop: 10,
      textAlign: "justify",
    },
    image: {
      height: 300,
      width: "100%",
    },
    title: {
      color: theme.colors.text,
      fontSize: 24,
      padding: 10,
    },
  });
