import { storageKeys } from "@/constants";
import FavoriteShowsContext from "@/context/favoriteShowsContext";
import { setStorageItem } from "@/services/persistenceService";
import { Show } from "@/types";
import { useContext } from "react";

const useFavoriteShows = () => {
  const { favoriteShows, refreshFavoriteShows } =
    useContext(FavoriteShowsContext);

  const isShowFavorite = (showId: Show["id"]) =>
    favoriteShows?.some((show) => show.id === showId);

  const storeFavoriteShow = (show: Show) => {
    const newFavoritesArray = [...favoriteShows, show];
    setStorageItem(storageKeys.FAVORITES, newFavoritesArray);
    refreshFavoriteShows && refreshFavoriteShows();
  };

  const deleteFavoriteShow = (showId: Show["id"]) => {
    const filteredFavoritesArray = favoriteShows.filter(
      (show) => show.id !== showId,
    );
    setStorageItem(storageKeys.FAVORITES, filteredFavoritesArray);
    refreshFavoriteShows && refreshFavoriteShows();
  };

  return {
    favoriteShows,
    isShowFavorite,
    storeFavoriteShow,
    deleteFavoriteShow,
    refreshFavoriteShows,
  };
};

export { useFavoriteShows };
