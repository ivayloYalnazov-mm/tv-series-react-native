import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FavoritesNavigationButton } from "./FavoritesNavigationButton";
import * as reactNavigation from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("FavoritesNavigationButton", () => {
  it("navigates to FavoriteShowsScreen when pressed", () => {
    const navigateMock = jest.fn();
    (reactNavigation.useNavigation as jest.Mock).mockImplementation(() => ({
      navigate: navigateMock,
    }));

    const { getByTestId } = render(<FavoritesNavigationButton />);

    fireEvent.press(getByTestId("icon-button"));

    expect(navigateMock).toHaveBeenCalledWith("FavoriteShowsScreen");
  });
});
