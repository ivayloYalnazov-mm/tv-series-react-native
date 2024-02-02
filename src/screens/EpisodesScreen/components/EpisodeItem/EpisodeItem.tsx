import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Episode } from "@/types";
import { AppImage } from "@/components";
import { episodeItemStyles } from "./EpisodeItem.styles";

interface EpisodeItemProps {
  episode: Episode;
}

const EpisodeItem = ({ episode }: EpisodeItemProps) => {
  const theme = useTheme();
  const styles = episodeItemStyles(theme);
  const summaryText = episode?.summary?.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <TouchableOpacity style={styles.item}>
      <AppImage source={{ uri: episode?.image?.medium }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{episode?.name}</Text>
        <Text style={styles.details}>
          Season {episode?.season}, Episode {episode?.number} - Airdate:{" "}
          {episode?.airdate}
        </Text>
        <Text style={styles.summary} numberOfLines={3}>
          {summaryText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export { EpisodeItem };
