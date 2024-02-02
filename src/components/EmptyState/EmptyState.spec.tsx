import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders correctly with the message", () => {
    const { getByText } = render(<EmptyState />);

    expect(getByText("No items available")).toBeTruthy();
  });
});
