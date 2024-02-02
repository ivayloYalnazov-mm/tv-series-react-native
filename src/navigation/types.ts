import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  SearchScreen: undefined;
  ShowDetailsScreen: { showId: string };
  EpisodesScreen: { showId: string };
  FavoriteShowsScreen: undefined;
};

export type SearchScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  "SearchScreen"
>;

export type FavoriteShowsScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  "FavoriteShowsScreen"
>;

export type ShowDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ShowDetailsScreen"
>;

export type ShowDetailsScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  "ShowDetailsScreen"
>;

export type EpisodesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ShowDetailsScreen"
>;

export type EpisodesScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  "EpisodesScreen"
>;
