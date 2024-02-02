import React from "react";
import { render } from "@testing-library/react-native";
import { PageErrorView } from "./PageErrorView";

describe("PageErrorView", () => {
  const errorText = "An error has occurred!";

  it("displays the error text correctly", () => {
    const { getByText } = render(<PageErrorView errorText={errorText} />);
    expect(getByText(errorText)).toBeTruthy();
  });
});
