import React from "react";
import { render } from "@testing-library/react-native";
import { FavoriteShowsScreen } from "./FavoriteShowsScreen";
import { useFavoriteShows } from "@/hooks";

jest.mock("@/hooks", () => ({
  useFavoriteShows: jest.fn(),
}));

describe("FavoriteShowsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays EmptyState when there are no favorite shows", () => {
    jest.mocked(useFavoriteShows).mockReturnValue({
      favoriteShows: [],
      isShowFavorite: () => false,
      storeFavoriteShow: () => {},
      deleteFavoriteShow: () => {},
      refreshFavoriteShows: () => {},
    });

    const { getByText } = render(<FavoriteShowsScreen />);

    expect(getByText("No items available")).toBeTruthy();
  });
});
