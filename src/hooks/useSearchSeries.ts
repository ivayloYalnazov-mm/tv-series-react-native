import { storageKeys } from "@/constants";
import { searchSeriesByQuery } from "@/services/apiService";
import { getStorageItem, setStorageItem } from "@/services/persistenceService";
import { ShowData } from "@/types";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNetworkStatus } from "./useNetworkStatus/useNetworkStatus";

const useSearchSeries = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const { isOffline } = useNetworkStatus();

  const mergeAndSelectTopShows = (
    existingShows: ShowData[],
    newShows: ShowData[],
  ) => {
    const mergedArray = [...existingShows, ...newShows];

    const uniqueShowsMap = mergedArray.reduce((acc, showData) => {
      if (
        !acc[showData.show.id] ||
        acc[showData.show.id].score < showData.score
      ) {
        acc[showData.show.id] = showData;
      }
      return acc;
    }, {} as { [id: string]: ShowData });

    const uniqueShows = Object.values(uniqueShowsMap);
    uniqueShows.sort((a, b) => b.score - a.score);
    return uniqueShows.slice(0, 10);
  };

  const cacheShows = useCallback((shows: ShowData[]) => {
    const cachedShows = getStorageItem<ShowData[]>(storageKeys.CACHED_SHOWS);
    const mergedShows = cachedShows
      ? mergeAndSelectTopShows(cachedShows, shows)
      : shows;
    setStorageItem(storageKeys.CACHED_SHOWS, mergedShows);
  }, []);

  useEffect(() => {
    if (query.length > 0 && !hasSearched) {
      setHasSearched(true);
    }
  }, [query, hasSearched]);

  useEffect(() => {
    if (isOffline) {
      setIsLoading(false);
      return;
    }
    const fetchSeries = async () => {
      setIsLoading(true);

      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const data = await searchSeriesByQuery(query);
      cacheShows(data);
      setResults(data);

      setIsLoading(false);
    };

    fetchSeries();
  }, [query, isOffline, cacheShows]);

  const returnResults = useMemo(() => {
    if (isOffline) {
      const cachedShows = getStorageItem<ShowData[]>(storageKeys.CACHED_SHOWS);
      return cachedShows || [];
    }
    return results;
  }, [isOffline, results]);

  return { query, setQuery, results: returnResults, isLoading, hasSearched };
};

export { useSearchSeries };
