/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { render } from "@testing-library/react-native";
import { AppImage } from "./AppImage";

describe("AppImage", () => {
  it("should render an Image component with the given source and props", () => {
    const source = { uri: "https://example.com/image.jpg" };
    const props = { width: 100, height: 100 };

    const { getByTestId } = render(<AppImage source={source} {...props} />);

    const imageComponent = getByTestId("app-image");
    expect(imageComponent.props.source).toEqual(source);
    expect(imageComponent.props.width).toEqual(props.width);
    expect(imageComponent.props.height).toEqual(props.height);
  });

  it("should fall back to a default image when the source does not have a uri property", () => {
    const source = {};

    const { getByTestId } = render(<AppImage source={source} />);

    const imageComponent = getByTestId("app-image");
    expect(imageComponent.props.source).toEqual(
      require("../../assets/image-fallback.png"),
    );
  });
});
