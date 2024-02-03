import React from "react";
import { render } from "@testing-library/react-native";
import { FavoriteShowsScreen } from "./FavoriteShowsScreen";
import { useFavoriteShows } from "@/hooks";
import { Show } from "@/types";
import { MockFlatList } from "@/__mocks__";

jest.mock("@/hooks", () => ({
  useFavoriteShows: jest.fn(),
}));

jest.mock("../../components/ShowCard/ShowCard", () => "ShowCard");

jest.mock("react-native/Libraries/Lists/FlatList", () => {
  return jest.fn(({ data }) => (
    <MockFlatList
      data={data}
      containerTestID="favorite-shows-list"
      itemPrefixTestID="favorite-show"
    />
  ));
});

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

  it("renders ShowCard for each favorite show", () => {
    const mockFavoriteShows = [
      {
        id: "1",
        name: "Show 1",
      },
      {
        id: "2",
        name: "Show 2",
      },
    ];

    jest.mocked(useFavoriteShows).mockReturnValue({
      favoriteShows: mockFavoriteShows as Show[],
      isShowFavorite: () => true,
      storeFavoriteShow: () => {},
      deleteFavoriteShow: () => {},
      refreshFavoriteShows: () => {},
    });

    const { getByTestId } = render(<FavoriteShowsScreen />);

    mockFavoriteShows.forEach((show) => {
      const showTestID = `favorite-show-${show.id}`;
      const showItem = getByTestId(showTestID);
      expect(showItem).toBeTruthy();
    });
  });
});
