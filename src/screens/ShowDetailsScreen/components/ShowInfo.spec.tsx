/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ShowInfo } from "./ShowInfo";
import { Linking } from "react-native";
import { Show } from "@/types";

jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: jest.fn(),
}));

describe("ShowInfo", () => {
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

  it("displays show information correctly", () => {
    const { getByText } = render(<ShowInfo show={mockShow} />);

    expect(getByText(`Type: ${mockShow.type}`)).toBeTruthy();
    expect(getByText(`Language: ${mockShow.language}`)).toBeTruthy();
    expect(getByText(`Genres: ${mockShow.genres.join(", ")}`)).toBeTruthy();
    expect(getByText(`Status: ${mockShow.status}`)).toBeTruthy();
    expect(getByText(`Rating: ${mockShow.rating.average}`)).toBeTruthy();
  });

  it("renders the Official Site link when an official site is provided", () => {
    const { getByText } = render(<ShowInfo show={mockShow} />);

    expect(getByText("Official Site")).toBeTruthy();
  });

  it("does not render the Official Site link when no official site is provided", () => {
    const { queryByText } = render(
      <ShowInfo show={{ ...mockShow, officialSite: undefined } as any} />,
    );

    expect(queryByText("Official Site")).toBeNull();
  });

  it("opens the official site when the link is pressed", () => {
    const { getByText } = render(<ShowInfo show={mockShow} />);
    const linkButton = getByText("Official Site");

    fireEvent.press(linkButton);

    expect(Linking.openURL).toHaveBeenCalledWith(mockShow.officialSite);
  });
});
