import { useState, useEffect, useMemo } from "react";
import { GENERIC_ERROR_MESSAGE, storageKeys } from "@/constants";
import { fetchShowById } from "@/services/apiService";
import { getStorageItem, setStorageItem } from "@/services/persistenceService";
import { Show, ShowData } from "@/types";
import { useNetworkStatus } from "./useNetworkStatus/useNetworkStatus";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchScreenRouteProp } from "@/navigation/types";

interface UseShowDetailsProps {
  showId: string;
}

const useShowDetails = ({ showId }: UseShowDetailsProps) => {
  const navigation = useNavigation<SearchScreenRouteProp>();
  const [details, setDetails] = useState<Show | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOffline } = useNetworkStatus();

  useEffect(() => {
    if (isOffline) {
      setIsLoading(false);
      return;
    }
    const fetchShowDetails = async () => {
      if (!showId) {
        return;
      }

      setIsLoading(true);

      const show = getStorageItem<Show>(storageKeys.CACHED_SHOW);
      if (show?.id === showId) {
        setDetails(show);
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchShowById(showId);
        setStorageItem(storageKeys.CACHED_SHOW, data);
        setDetails(data);
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
    };

    fetchShowDetails();
  }, [showId, isOffline, navigation]);

  const returnDetails = useMemo(() => {
    if (isOffline) {
      const cachedShows = getStorageItem<ShowData[]>(storageKeys.CACHED_SHOWS);
      const showDetails = cachedShows?.find(
        (showData) => showData?.show?.id === showId,
      );
      return showDetails?.show ? showDetails.show : null;
    }
    return details;
  }, [details, isOffline, showId]);

  return { details: returnDetails, isLoading, isOffline };
};

export { useShowDetails };
