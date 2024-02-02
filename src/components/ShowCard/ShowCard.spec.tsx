import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ShowCard } from "./ShowCard";
import { useNavigation } from "@react-navigation/native";
import { useFavoriteShows } from "@/hooks";
import { Show } from "@/types";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));
jest.mock("@/hooks", () => ({
  useFavoriteShows: jest.fn(),
}));
jest.mock("../AppImage/AppImage", () => ({
  AppImage: () => "AppImage",
}));

const mockShow: Show = {
  id: "1",
  name: "Sample Show",
  rating: { average: 9 },
  genres: ["Drama", "Thriller"],
  image: {
    original: "http://example.com/sample-show.jpg",
    medium: "http://example.com/sample-show.jpg",
  },
  type: "Scripted",
  language: "English",
  status: "Running",
  officialSite: "http://example.com",
  summary: "Sample summary",
  premiered: "2020-01-01",
};

describe("ShowCard", () => {
  const mockNavigate = jest.fn();
  const mockStoreFavoriteShow = jest.fn();
  const mockDeleteFavoriteShow = jest.fn();
  const mockIsShowFavorite = jest.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    mockStoreFavoriteShow.mockClear();
    mockDeleteFavoriteShow.mockClear();
    mockIsShowFavorite.mockClear();

    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useFavoriteShows as jest.Mock).mockReturnValue({
      storeFavoriteShow: mockStoreFavoriteShow,
      deleteFavoriteShow: mockDeleteFavoriteShow,
      isShowFavorite: mockIsShowFavorite.mockReturnValue(false),
    });
  });

  it("navigates to show details screen on press", () => {
    const { getByTestId } = render(<ShowCard show={mockShow} />);
    fireEvent.press(getByTestId("show-card"));
    expect(mockNavigate).toHaveBeenCalledWith("ShowDetailsScreen", {
      showId: mockShow.id,
    });
  });

  it("toggles favorite status on favorite button press", () => {
    mockIsShowFavorite.mockReturnValueOnce(false);
    const { getByTestId } = render(<ShowCard show={mockShow} />);
    fireEvent.press(getByTestId("icon-button"));
    expect(mockStoreFavoriteShow).toHaveBeenCalledWith(mockShow);
  });

  it("displays rating and genres if available", () => {
    const { getByText } = render(<ShowCard show={mockShow} />);
    const detailsText = `Rating: ${
      mockShow.rating.average
    } | ${mockShow.genres.join(", ")}`;
    expect(getByText(detailsText)).toBeTruthy();
  });

  it("does not display rating and genres if not available", () => {
    const showWithoutDetails: Show = {
      ...mockShow,
      rating: { average: undefined },
      genres: [],
    };
    const { queryByText } = render(<ShowCard show={showWithoutDetails} />);
    const detailsText = `Rating: N/A | N/A`;
    expect(queryByText(detailsText)).toBeNull();
  });
});
