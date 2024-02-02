import { FavoritesButton } from "@/components";
import React from "react";
import { navigationButtonStyles } from "./FavoritesNavigationButton.styles";
import { useNavigation } from "@react-navigation/native";
import { FavoriteShowsScreenRouteProp } from "../../types";

const FavoritesNavigationButton = () => {
  const navigation = useNavigation<FavoriteShowsScreenRouteProp>();
  const navigateToFavorites = () => navigation.navigate("FavoriteShowsScreen");

  return (
    <FavoritesButton
      onPress={navigateToFavorites}
      imageStyle={navigationButtonStyles.image}
      buttonStyle={navigationButtonStyles.button}
      isActive
    />
  );
};

export { FavoritesNavigationButton };
