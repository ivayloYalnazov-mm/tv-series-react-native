import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { showCardStyles } from "./ShowCard.styles";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ShowDetailsScreenNavigationProp } from "@/navigation/types";
import { Show } from "@/types";
import { AppImage } from "../AppImage/AppImage";
import { FavoritesButton } from "../FavoritesButton/FavoritesButton";
import { useFavoriteShows } from "@/hooks";

interface ShowCardProps {
  show: Show;
}

const ShowCard = ({ show }: ShowCardProps) => {
  const theme = useTheme();
  const styles = showCardStyles(theme);
  const navigation = useNavigation<ShowDetailsScreenNavigationProp>();
  const { storeFavoriteShow, deleteFavoriteShow, isShowFavorite } =
    useFavoriteShows();

  const toggleFavorite = () => {
    if (isShowFavorite(show.id)) {
      deleteFavoriteShow(show.id);
    } else {
      storeFavoriteShow(show);
    }
  };

  const navigateToShowDetail = () => {
    navigation.navigate("ShowDetailsScreen", { showId: show.id });
  };

  const ratingAndGenres = useMemo(
    () =>
      `Rating: ${show?.rating?.average || "N/A"} | ${
        show?.genres?.join(", ") || "N/A"
      }`,
    [show?.rating, show?.genres],
  );

  const shouldShowDetails = useMemo(
    () => Boolean(show?.rating?.average) || Boolean(show?.genres?.length > 0),
    [show.rating.average, show.genres],
  );

  return (
    <View>
      <View style={styles.favoriteButton}>
        <FavoritesButton
          onPress={toggleFavorite}
          isActive={isShowFavorite(show.id)}
        />
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={navigateToShowDetail}
        testID="show-card"
      >
        <AppImage
          source={{
            uri: show?.image?.original,
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{show.name}</Text>
          {shouldShowDetails && (
            <Text style={styles.details}>{ratingAndGenres}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { ShowCard };
