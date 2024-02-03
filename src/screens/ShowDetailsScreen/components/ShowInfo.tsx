import React from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ShowInfoStyles } from "./ShowInfo.styles";
import { Show } from "@/types";

interface ShowInfoProps {
  show: Show;
}

const ShowInfo = ({ show }: ShowInfoProps) => {
  const theme = useTheme();
  const styles = ShowInfoStyles(theme);

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>Type: {show?.type || "N/A"}</Text>
      <Text style={styles.infoText}>Language: {show?.language || "N/A"}</Text>
      <Text style={styles.infoText}>
        Genres: {show?.genres?.join(", ") || "N/A"}
      </Text>
      <Text style={styles.infoText}>Status: {show?.status || "N/A"}</Text>
      <Text style={styles.infoText}>
        Rating: {show?.rating?.average || "N/A"}
      </Text>
      {show?.officialSite && (
        <TouchableOpacity
          onPress={() => Linking.openURL(show.officialSite)}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Official Site</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export { ShowInfo };
