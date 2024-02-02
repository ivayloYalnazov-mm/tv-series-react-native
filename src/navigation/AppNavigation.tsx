import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import {
  SearchScreen,
  ShowDetailsScreen,
  EpisodesScreen,
  FavoriteShowsScreen,
} from "@/screens";
import { DarkAppTheme } from "@/themes";
import { FavoritesNavigationButton } from "./components";

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer theme={DarkAppTheme}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerTitle: "Search",
            headerRight: FavoritesNavigationButton,
          }}
        />
        <RootStack.Screen
          name="ShowDetailsScreen"
          component={ShowDetailsScreen}
          options={{ headerTitle: "Details" }}
        />
        <RootStack.Screen
          name="EpisodesScreen"
          component={EpisodesScreen}
          options={{ headerTitle: "Episodes" }}
        />
        <RootStack.Screen
          name="FavoriteShowsScreen"
          component={FavoriteShowsScreen}
          options={{ headerTitle: "Favorite Shows" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigation };
