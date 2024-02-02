import React from "react";
import {
  EpisodesScreenNavigationProp,
  ShowDetailsScreenRouteProp,
} from "@/navigation/types";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useShowDetails } from "@/hooks";
import { useNavigation, useTheme } from "@react-navigation/native";
import { showDetailsScreenStyles } from "./ShowDetailsScreen.styles";
import { AppImage, PageErrorView, PageLoadingIndicator } from "@/components";
import { stripHtml } from "@/utils";

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
    <ScrollView style={styles.container}>
      <AppImage
        source={{
          uri: details?.image?.medium,
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{details?.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Type: {details?.type || "N/A"}</Text>
        <Text style={styles.infoText}>
          Language: {details?.language || "N/A"}
        </Text>
        <Text style={styles.infoText}>
          Genres: {details?.genres?.join(", ") || "N/A"}
        </Text>
        <Text style={styles.infoText}>Status: {details?.status || "N/A"}</Text>
        <Text style={styles.infoText}>
          Rating: {details?.rating?.average || "N/A"}
        </Text>
        {details?.officialSite && (
          <TouchableOpacity
            onPress={() => Linking.openURL(details.officialSite)}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Official Site</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.description}>{cleanSummary}</Text>

      <TouchableOpacity
        onPress={navigateToEpisodesScreen}
        style={[
          styles.button,
          {
            backgroundColor: isOffline
              ? theme.colors.placeholderText
              : theme.colors.primary,
          },
        ]}
        disabled={isOffline}
      >
        <Text style={styles.buttonText}>View Episodes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export { ShowDetailsScreen };
