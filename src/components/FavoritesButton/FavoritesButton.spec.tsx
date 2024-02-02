/* eslint-disable react/no-unknown-property */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FavoritesButton } from "./FavoritesButton";

describe("FavoritesButton", () => {
  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <FavoritesButton onPress={mockOnPress} isActive={false} />,
    );

    fireEvent.press(getByTestId("icon-button"));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
