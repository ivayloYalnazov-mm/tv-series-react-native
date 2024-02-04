import { GENERIC_ERROR_MESSAGE, storageKeys } from "@/constants";
import { SearchScreenRouteProp } from "@/navigation/types";
import { fetchShowEpisodes } from "@/services/apiService";
import { getStorageItem } from "@/services/persistenceService";
import { Episode, Show } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface UseShowEpisodesProps {
  showId: string;
}

const useShowEpisodes = ({ showId }: UseShowEpisodesProps) => {
  const navigation = useNavigation<SearchScreenRouteProp>();
  const [results, setResults] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodesData = getStorageItem<{
        showId: Show["id"];
        episodes: Episode[];
      }>(storageKeys.CACHED_EPISODES);

      if (episodesData?.showId === showId && episodesData?.episodes) {
        setResults(episodesData.episodes);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      if (showId) {
        try {
          const data = await fetchShowEpisodes(showId);
          setResults(data);
        } catch (error) {
          Alert.alert(
            "Error",
            GENERIC_ERROR_MESSAGE,
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("SearchScreen"),
              },
            ],
            { cancelable: false },
          );
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchEpisodes();
  }, [navigation, showId]);

  return { results, isLoading };
};

export { useShowEpisodes };
