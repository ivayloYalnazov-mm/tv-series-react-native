import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const showDetailsScreenStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
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
    title: {
      color: theme.colors.text,
      fontSize: 24,
      padding: 10,
    },
  });
