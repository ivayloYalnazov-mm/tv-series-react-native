import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const searchScreenStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    searchInput: {
      backgroundColor: theme.colors.card,
      borderRadius: 5,
      color: theme.colors.text,
      marginBottom: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
  });
