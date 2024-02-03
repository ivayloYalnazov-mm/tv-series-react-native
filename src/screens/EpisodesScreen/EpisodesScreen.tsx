import React from "react";
import { View, FlatList } from "react-native";
import { EpisodesScreenRouteProp } from "@/navigation/types";
import { episodesScreenStyles } from "./EpisodesScreen.styles";
import { EpisodeItem } from "./components";
import { useLocalInfiniteScrollData, useShowEpisodes } from "@/hooks";
import { EmptyState, PageLoadingIndicator } from "@/components";
import { Episode } from "@/types";

const EpisodesScreen = ({ route: { params } }: EpisodesScreenRouteProp) => {
  const { showId } = params;
  const { results, isLoading } = useShowEpisodes({ showId });
  const { itemsToRender, loadMoreItems } =
    useLocalInfiniteScrollData<Episode>(results);

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  if (!isLoading && results.length === 0) {
    return <EmptyState />;
  }

  return (
    <View style={episodesScreenStyles.container}>
      <FlatList
        testID="episodes-list"
        data={itemsToRender}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={3}
        renderItem={({ item }) => (
          <EpisodeItem episode={item} testID={`episode-item-${item.id}`} />
        )}
      />
    </View>
  );
};

export { EpisodesScreen };
