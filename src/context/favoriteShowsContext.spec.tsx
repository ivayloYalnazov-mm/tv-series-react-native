import React from "react";
import { render } from "@testing-library/react-native";
import FavoriteShowsContext, {
  FavoriteShowsProvider,
} from "./favoriteShowsContext";
import * as PersistenceService from "@/services/persistenceService";
import { Text } from "react-native";

jest.mock("@/services/persistenceService", () => ({
  getStorageItem: jest.fn(),
}));

describe("FavoriteShowsProvider", () => {
  it("initializes with favorite shows from storage", () => {
    const storedShows = [
      { id: "1", name: "Show 1" },
      { id: "2", name: "Show 2" },
    ];
    (PersistenceService.getStorageItem as jest.Mock).mockReturnValue(
      storedShows,
    );

    const { getByText } = render(
      <FavoriteShowsProvider>
        <FavoriteShowsConsumer />
      </FavoriteShowsProvider>,
    );

    expect(getByText("Show 1")).toBeTruthy();
    expect(getByText("Show 2")).toBeTruthy();
  });
});

const FavoriteShowsConsumer = () => {
  return (
    <FavoriteShowsContext.Consumer>
      {({ favoriteShows }) => (
        <>
          {favoriteShows.map((show) => (
            <Text key={show.id}>{show.name}</Text>
          ))}
        </>
      )}
    </FavoriteShowsContext.Consumer>
  );
};
