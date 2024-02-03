/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { EpisodesScreen } from "./EpisodesScreen";
import { useLocalInfiniteScrollData, useShowEpisodes } from "@/hooks";
import { Episode } from "@/types";
import { MockFlatList } from "@/__mocks__";

jest.mock("@/hooks", () => ({
  useLocalInfiniteScrollData: jest.fn(() => ({
    itemsToRender: [],
    loadMoreItems: () => {},
  })),
  useShowEpisodes: jest.fn(() => ({
    results: [],
    isLoading: true,
  })),
}));

jest.mock("react-native/Libraries/Lists/FlatList", () => {
  return jest.fn(({ data }) => (
    <MockFlatList
      data={data}
      containerTestID="episodes-list"
      itemPrefixTestID="episode-item"
    />
  ));
});

jest.mock("./components/EpisodeItem/EpisodeItem", () => "EpisodeItem");

describe("EpisodesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const episodes: Episode[] = [
    {
      id: "1",
      url: "http://example.com/episode1",
      name: "Episode 1",
      season: 1,
      number: 1,
      type: "regular",
      airdate: "2020-01-01",
      rating: { average: 7.5 },
      image: {
        medium: "http://example.com/image1.jpg",
        original: "http://example.com/image1.jpg",
      },
      summary: "Summary for episode 1",
    },
    {
      id: "2",
      url: "http://example.com/episode1",
      name: "Episode 2",
      season: 2,
      number: 2,
      type: "regular",
      airdate: "2020-01-01",
      rating: { average: 7.5 },
      image: {
        medium: "http://example.com/image1.jpg",
        original: "http://example.com/image1.jpg",
      },
      summary: "Summary for episode 2",
    },
  ];

  const route = {
    params: { showId: "123" },
    key: "EpisodesScreen-key",
    name: "EpisodesScreen" as const,
  };

  const navigation = {
    navigate: jest.fn(),
  };
  const props: any = { route, navigation };

  it("renders the PageLoadingIndicator while loading", () => {
    const { getByTestId } = render(<EpisodesScreen {...props} />);

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("does not render the PageLoadingIndicator when not loading", () => {
    jest.mocked(useShowEpisodes).mockReturnValue({
      results: episodes,
      isLoading: false,
    });
    jest.mocked(useLocalInfiniteScrollData).mockReturnValue({
      itemsToRender: episodes,
      loadMoreItems: () => {},
    });

    const { queryByTestId } = render(<EpisodesScreen {...props} />);

    expect(queryByTestId("loading-indicator")).toBeNull();
  });

  it("renders the FlatList with EpisodeItems after loading", async () => {
    jest.mocked(useShowEpisodes).mockReturnValue({
      results: episodes,
      isLoading: false,
    });
    jest.mocked(useLocalInfiniteScrollData).mockReturnValue({
      itemsToRender: episodes,
      loadMoreItems: () => {},
    });

    const { getByTestId, queryAllByTestId } = render(
      <EpisodesScreen {...props} />,
    );

    expect(getByTestId("episodes-list")).toBeTruthy();

    await waitFor(() => {
      episodes.forEach((episode) => {
        expect(
          queryAllByTestId(`episode-item-${episode.id}`).length,
        ).toBeGreaterThan(0);
      });
    });
  });

  it("calls loadMoreItems when FlatList end is reached", () => {
    const loadMoreItemsMock = jest.fn();

    jest
      .mocked(useShowEpisodes)
      .mockReturnValue({ results: episodes, isLoading: false });

    jest.mocked(useLocalInfiniteScrollData).mockReturnValue({
      itemsToRender: episodes,
      loadMoreItems: loadMoreItemsMock,
    });

    const { getByTestId } = render(<EpisodesScreen {...props} />);

    fireEvent(getByTestId("episodes-list"), "onEndReached");
    expect(loadMoreItemsMock).toHaveBeenCalled();
  });

  it("renders correctly when there are no episodes", () => {
    jest.mocked(useShowEpisodes).mockReturnValue({
      results: [],
      isLoading: false,
    });
    jest.mocked(useLocalInfiniteScrollData).mockReturnValue({
      itemsToRender: [],
      loadMoreItems: () => {},
    });

    const { getByText, queryByTestId } = render(<EpisodesScreen {...props} />);
    expect(getByText("No items available")).toBeTruthy();
    expect(queryByTestId("episodes-list")).toBeNull();
  });

  it("uses episode IDs as keys for list items", () => {
    jest.mocked(useShowEpisodes).mockReturnValue({
      results: episodes,
      isLoading: false,
    });
    jest.mocked(useLocalInfiniteScrollData).mockReturnValue({
      itemsToRender: episodes,
      loadMoreItems: () => {},
    });

    const { getByTestId } = render(<EpisodesScreen {...props} />);

    episodes.forEach((episode) => {
      const episodeTestID = `episode-item-${episode.id}`;
      const episodeItem = getByTestId(episodeTestID);
      expect(episodeItem).toBeTruthy();
    });
  });
});
