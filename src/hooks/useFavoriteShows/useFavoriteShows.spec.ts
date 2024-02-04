import { renderHook, act } from "@testing-library/react-native";
import { useFavoriteShows } from "./useFavoriteShows";
import * as React from "react";
import { setStorageItem } from "@/services/persistenceService";
import { Show } from "@/types";
import { storageKeys } from "@/constants";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

jest.mock("@/services/persistenceService", () => ({
  setStorageItem: jest.fn(),
}));

const mockFavoriteShows = [
  { id: "1", name: "Favorite Show 1" },
  { id: "2", name: "Favorite Show 2" },
];

const mockRefreshFavoriteShows = jest.fn();

jest.mocked(React.useContext).mockImplementation(() => ({
  favoriteShows: mockFavoriteShows,
  refreshFavoriteShows: mockRefreshFavoriteShows,
}));

describe("useFavoriteShows", () => {
  it("checks if a show is marked as favorite", () => {
    const { result } = renderHook(() => useFavoriteShows());

    const isFavorite = result.current.isShowFavorite("1");
    expect(isFavorite).toBe(true);

    const isNotFavorite = result.current.isShowFavorite("3");
    expect(isNotFavorite).toBe(false);
  });

  it("stores a new favorite show", () => {
    const newShow = { id: "3", name: "New Favorite Show" };
    const { result } = renderHook(() => useFavoriteShows());

    act(() => {
      result.current.storeFavoriteShow(newShow as Show);
    });

    expect(setStorageItem).toHaveBeenCalledWith(storageKeys.FAVORITES, [
      ...mockFavoriteShows,
      newShow,
    ]);
    expect(mockRefreshFavoriteShows).toHaveBeenCalled();
  });

  it("deletes a favorite show", () => {
    const { result } = renderHook(() => useFavoriteShows());

    act(() => {
      result.current.deleteFavoriteShow("1");
    });

    expect(setStorageItem).toHaveBeenCalledWith(storageKeys.FAVORITES, [
      mockFavoriteShows[1],
    ]);
    expect(mockRefreshFavoriteShows).toHaveBeenCalled();
  });
});
