/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ShowDetailsScreen } from "./ShowDetailsScreen";
import { useShowDetails } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { Show } from "@/types";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useShowDetails: jest.fn(),
}));

jest.mock("../../components/AppImage/AppImage", () => ({
  AppImage: () => "MockedAppImage",
}));

jest.mock("./components/ShowInfo", () => ({
  ShowInfo: () => "MockedShowInfo",
}));

describe("ShowDetailsScreen", () => {
  const route = { params: { showId: "1" } };
  const navigateMock = jest.fn();

  const navigation = {
    navigate: jest.fn(),
  };
  const props: any = { route, navigation };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock });
  });

  it("displays loading indicator while loading", () => {
    jest.mocked(useShowDetails).mockReturnValue({
      details: null,
      isLoading: true,
      isOffline: false,
    });

    const { getByTestId } = render(<ShowDetailsScreen {...props} />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("displays error view when no details are available", () => {
    jest.mocked(useShowDetails).mockReturnValue({
      details: null,
      isLoading: false,
      isOffline: false,
    });

    const { getByTestId } = render(<ShowDetailsScreen {...props} />);
    expect(getByTestId("page-error-view")).toBeTruthy();
  });

  it("displays show details when data is available", () => {
    const mockDetails = {
      id: "1",
      name: "Test Show",
      summary: "<p>Test Summary</p>",
    };

    jest.mocked(useShowDetails).mockReturnValue({
      details: mockDetails as Show,
      isLoading: false,
      isOffline: false,
    });

    const { getByText } = render(<ShowDetailsScreen {...props} />);
    expect(getByText("Test Show")).toBeTruthy();
    expect(getByText("Test Summary")).toBeTruthy();
  });

  it("navigates to EpisodesScreen on button press", () => {
    jest.mocked(useShowDetails).mockReturnValue({
      details: { name: "Test Show" } as Show,
      isLoading: false,
      isOffline: false,
    });

    const { getByTestId } = render(<ShowDetailsScreen {...props} />);

    fireEvent.press(getByTestId("view-episodes-button"));

    expect(navigateMock).toHaveBeenCalledWith("EpisodesScreen", {
      showId: "1",
    });
  });

  it("disables the View Episodes button when offline", () => {
    jest.mocked(useShowDetails).mockReturnValue({
      details: { name: "Test Show" } as Show,
      isLoading: false,
      isOffline: true,
    });

    const { queryByTestId } = render(<ShowDetailsScreen {...props} />);

    expect(queryByTestId("button")).toBeNull();
  });
});
