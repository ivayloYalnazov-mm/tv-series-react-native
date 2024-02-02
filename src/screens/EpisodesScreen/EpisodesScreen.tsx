import React from "react";
import { View, FlatList } from "react-native";
import { EpisodesScreenRouteProp } from "@/navigation/types";
import { episodesScreenStyles } from "./EpisodesScreen.styles";
import { EpisodeItem } from "./components";
import { useLocalInfiniteScrollData, useShowEpisodes } from "@/hooks";
import { PageLoadingIndicator } from "@/components";
import { Episode } from "@/types";

const EpisodesScreen = ({ route: { params } }: EpisodesScreenRouteProp) => {
  const { showId } = params;
  const { results, isLoading } = useShowEpisodes({ showId });
  const { itemsToRender, loadMoreItems } =
    useLocalInfiniteScrollData<Episode>(results);

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  return (
    <View style={episodesScreenStyles.container}>
      <FlatList
        data={itemsToRender}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={3}
        renderItem={({ item }) => <EpisodeItem episode={item} />}
      />
    </View>
  );
};

export { EpisodesScreen };
