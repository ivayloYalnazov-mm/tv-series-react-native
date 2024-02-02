import React from "react";
import { render } from "@testing-library/react-native";
import { PageLoadingIndicator } from "./PageLoadingIndicator";

describe("PageLoadingIndicator", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<PageLoadingIndicator />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });
});
