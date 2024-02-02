import { AppTheme } from "@/themes/types";
import { StyleSheet } from "react-native";

export const showCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      margin: 10,
      overflow: "hidden",
    },
    details: {
      color: theme.colors.text,
      fontSize: 14,
      marginTop: 5,
    },
    favoriteButton: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: 20,
      top: 20,
      zIndex: 1,
    },
    image: {
      height: 200,
      resizeMode: "cover",
      width: "100%",
    },
    infoContainer: {
      padding: 10,
    },
    title: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    wrapper: {
      position: "relative",
    },
  });
