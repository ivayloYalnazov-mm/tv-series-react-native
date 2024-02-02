import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { IconButton } from "./IconButton";
import { ImageSourcePropType } from "react-native";

describe("IconButton", () => {
  const mockOnPress = jest.fn();
  const iconSource = {
    uri: "https://example.com/icon.png",
  } as ImageSourcePropType;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <IconButton onPress={mockOnPress} iconSource={iconSource} />,
    );

    expect(getByTestId("icon-button")).toBeTruthy();
    expect(getByTestId("icon-image")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByTestId } = render(
      <IconButton onPress={mockOnPress} iconSource={iconSource} />,
    );

    fireEvent.press(getByTestId("icon-button"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    const buttonStyle = { backgroundColor: "blue" };
    const imageStyle = { tintColor: "red" };

    const { getByTestId } = render(
      <IconButton
        onPress={mockOnPress}
        iconSource={iconSource}
        buttonStyle={buttonStyle}
        imageStyle={imageStyle}
      />,
    );

    expect(getByTestId("icon-button").props.style).toContainEqual(buttonStyle);
    expect(getByTestId("icon-image").props.style).toContainEqual(imageStyle);
  });
});
