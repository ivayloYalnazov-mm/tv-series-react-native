import React from "react";
import { View, TextInput, FlatList } from "react-native";
import { searchScreenStyles } from "./SearchScreen.styles";
import { useTheme } from "@react-navigation/native";
import { useNetworkStatus, useSearchSeries } from "@/hooks";
import { DarkAppTheme } from "@/themes";
import { EmptyState, ShowCard } from "@/components";

const SearchScreen = () => {
  const theme = useTheme();
  const styles = searchScreenStyles(theme);
  const { query, setQuery, results, isLoading, hasSearched } =
    useSearchSeries();
  const { isOffline } = useNetworkStatus();

  return (
    <View style={styles.container}>
      {!isOffline && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search for TV series"
          placeholderTextColor={DarkAppTheme.colors.placeholderText}
          value={query}
          onChangeText={setQuery}
          testID="search-input"
        />
      )}
      {!isLoading && results.length === 0 && hasSearched ? (
        <EmptyState />
      ) : (
        <FlatList
          testID="search-results-list"
          data={results}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={({ item }) => (
            <ShowCard show={item.show} testID={`show-${item.show.id}`} />
          )}
        />
      )}
    </View>
  );
};

export { SearchScreen };
