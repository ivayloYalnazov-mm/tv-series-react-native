import React from "react";
import { render } from "@testing-library/react-native";
import { EpisodeItem } from "./EpisodeItem";

describe("EpisodeItem", () => {
  const episode = {
    id: "1",
    url: "https://www.example.com/episode/1",
    name: "Pilot",
    season: 1,
    number: 1,
    type: "regular",
    airdate: "2008-01-20",
    rating: {
      average: 8.6,
    },
    image: {
      medium: "http://example.com/sample-show.jpg",
      original: "http://example.com/sample-show.jpg",
    },
    summary: "This is the pilot episode of the series.",
  };

  it("renders episode information correctly", () => {
    const { getByText } = render(<EpisodeItem episode={episode} />);

    expect(getByText("Pilot")).toBeTruthy();
    expect(getByText("Season 1, Episode 1 - Airdate: 2008-01-20")).toBeTruthy();
    expect(getByText("This is the pilot episode of the series.")).toBeTruthy();
  });

  it("renders the episode image correctly", () => {
    const { getByTestId } = render(<EpisodeItem episode={episode} />);
    const image = getByTestId("app-image");

    expect(image.props.source.uri).toBe("http://example.com/sample-show.jpg");
  });
});
