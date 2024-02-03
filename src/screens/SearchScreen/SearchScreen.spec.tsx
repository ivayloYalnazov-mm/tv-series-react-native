/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchScreen } from "./SearchScreen";
import { useNetworkStatus, useSearchSeries } from "@/hooks";
import { MockFlatList } from "@/__mocks__";

jest.mock("@/hooks", () => ({
  useNetworkStatus: jest.fn(),
  useSearchSeries: jest.fn(),
}));

jest.mock("react-native/Libraries/Lists/FlatList", () => {
  return jest.fn(({ data }) => (
    <MockFlatList
      data={data}
      containerTestID="search-results-list"
      itemPrefixTestID="show"
    />
  ));
});

jest.mock("../../components/ShowCard/ShowCard", () => ({
  ShowCard: () => "MockedShowCard",
}));

describe("SearchScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders TextInput when online", () => {
    jest.mocked(useSearchSeries).mockReturnValue({
      hasSearched: false,
      isLoading: false,
      query: "",
      results: [],
      setQuery: jest.fn(),
    });
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: false });
    const { getByTestId } = render(<SearchScreen />);
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("does not render TextInput when offline", () => {
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: true });
    const { queryByTestId } = render(<SearchScreen />);
    expect(queryByTestId("search-input")).toBeNull();
  });

  it("renders EmptyState when there are no results after searching", () => {
    jest.mocked(useSearchSeries).mockReturnValue({
      hasSearched: true,
      isLoading: false,
      query: "",
      results: [],
      setQuery: jest.fn(),
    });
    const { getByText } = render(<SearchScreen />);
    expect(getByText("No items available")).toBeTruthy();
  });

  it("renders ShowCard for each result", () => {
    const mockResults = [
      { id: "1", name: "Show 1" },
      { id: "2", name: "Show 2" },
    ];
    jest.mocked(useSearchSeries).mockReturnValue({
      hasSearched: true,
      isLoading: false,
      query: "",
      results: mockResults as any[],
      setQuery: jest.fn(),
    });
    const { getByTestId } = render(<SearchScreen />);

    mockResults.forEach((showData) => {
      const showTestID = `show-${showData.id}`;
      const showItem = getByTestId(showTestID);
      expect(showItem).toBeTruthy();
    });
  });

  it("updates query on TextInput change", () => {
    jest.mocked(useSearchSeries).mockReturnValue({
      query: "",
      setQuery: jest.fn(),
      results: [],
      isLoading: false,
      hasSearched: false,
    });
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: false });

    const { getByTestId } = render(<SearchScreen />);
    const input = getByTestId("search-input");

    fireEvent.changeText(input, "New Query");
    expect(useSearchSeries().setQuery).toHaveBeenCalledWith("New Query");
  });
});
