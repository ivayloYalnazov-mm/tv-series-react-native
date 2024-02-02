import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const episodeItemStyles = (theme: AppTheme) =>
  StyleSheet.create({
    details: {
      color: theme.colors.text,
      fontSize: 14,
      opacity: 0.8,
    },
    image: {
      borderRadius: 8,
      height: "100%",
      marginRight: 10,
      width: 100,
    },
    infoContainer: {
      flex: 1,
      justifyContent: "center",
    },
    item: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      flexDirection: "row",
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 10,
    },
    summary: {
      color: theme.colors.text,
      fontSize: 14,
      marginTop: 4,
    },
    title: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
