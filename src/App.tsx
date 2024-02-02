import React, { useEffect } from "react";
import { AppNavigation } from "./navigation";
import { useNetworkStatus } from "./hooks";
import { Alert } from "react-native";
import { FavoriteShowsProvider } from "./context/favoriteShowsContext";

const App = () => {
  const { isOffline } = useNetworkStatus();

  useEffect(() => {
    if (isOffline) {
      Alert.alert(
        "Oops! Looks like you're offline. ",
        "Don't worry, you can still view the top 10 shows and their details based on your search history.",
      );
    }
  }, [isOffline]);

  return (
    <FavoriteShowsProvider>
      <AppNavigation />
    </FavoriteShowsProvider>
  );
};

export default App;
