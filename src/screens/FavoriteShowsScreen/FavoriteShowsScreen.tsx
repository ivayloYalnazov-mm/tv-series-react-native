import { EmptyState, ShowCard } from "@/components";
import { useFavoriteShows } from "@/hooks";
import React from "react";
import { View, FlatList } from "react-native";
import { favoriteShowsScreenStyles } from "./FavoriteShowsScreen.styles";

const FavoriteShowsScreen = () => {
  const { favoriteShows } = useFavoriteShows();

  if (favoriteShows.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={favoriteShowsScreenStyles.container}>
      <FlatList
        testID="favorite-shows-list"
        data={favoriteShows}
        keyExtractor={(show) => show.id.toString()}
        renderItem={({ item }) => (
          <ShowCard show={item} testID={`favorite-show-${item.id}`} />
        )}
      />
    </View>
  );
};

export { FavoriteShowsScreen };
