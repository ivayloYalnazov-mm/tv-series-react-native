import React from "react";
import {
  EpisodesScreenNavigationProp,
  ShowDetailsScreenRouteProp,
} from "@/navigation/types";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useShowDetails } from "@/hooks";
import { useNavigation, useTheme } from "@react-navigation/native";
import { showDetailsScreenStyles } from "./ShowDetailsScreen.styles";
import { AppImage, PageErrorView, PageLoadingIndicator } from "@/components";
import { stripHtml } from "@/utils";
import { ShowInfo } from "./components/ShowInfo";

const ShowDetailsScreen = ({
  route: { params },
}: ShowDetailsScreenRouteProp) => {
  const theme = useTheme();
  const styles = showDetailsScreenStyles(theme);
  const { showId } = params;
  const { details, isLoading, isOffline } = useShowDetails({ showId });
  const navigation = useNavigation<EpisodesScreenNavigationProp>();

  const navigateToEpisodesScreen = () => {
    navigation.navigate("EpisodesScreen", { showId });
  };

  const cleanSummary = details?.summary ? stripHtml(details.summary) : "";

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  if (!details) {
    return <PageErrorView errorText="Something went wrong!" />;
  }

  return (
    <ScrollView style={styles.container} testID="show-details">
      <AppImage
        source={{
          uri: details?.image?.medium,
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{details?.name}</Text>

      <ShowInfo show={details} />

      <Text style={styles.description}>{cleanSummary}</Text>

      {!isOffline && (
        <TouchableOpacity
          onPress={navigateToEpisodesScreen}
          style={styles.button}
          testID="view-episodes-button"
        >
          <Text style={styles.buttonText}>View Episodes</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export { ShowDetailsScreen };
