import { storageKeys } from "@/constants";
import { getStorageItem } from "@/services/persistenceService";
import { Show } from "@/types";
import React, { ReactNode, useEffect, useState } from "react";

type FavoriteShowsContextType = {
  favoriteShows: Show[];
  refreshFavoriteShows: () => void;
};

const defaultContextValue: FavoriteShowsContextType = {
  favoriteShows: [],
  refreshFavoriteShows: () => {},
};

const FavoriteShowsContext =
  React.createContext<FavoriteShowsContextType>(defaultContextValue);

type FavoriteShowsProviderProps = {
  children: ReactNode;
};

export const FavoriteShowsProvider: React.FC<FavoriteShowsProviderProps> = ({
  children,
}) => {
  const [favoriteShows, setFavoriteShows] = useState<Show[]>([]);

  const getStoredFavoriteShows = () => {
    const storedFavoriteShows = getStorageItem<Show[]>(storageKeys.FAVORITES);
    storedFavoriteShows && setFavoriteShows(storedFavoriteShows);
  };

  useEffect(getStoredFavoriteShows, []);

  return (
    <FavoriteShowsContext.Provider
      value={{ favoriteShows, refreshFavoriteShows: getStoredFavoriteShows }}
    >
      {children}
    </FavoriteShowsContext.Provider>
  );
};

export default FavoriteShowsContext;
