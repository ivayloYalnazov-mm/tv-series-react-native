import { renderHook } from "@testing-library/react-hooks/native";
import { useShowEpisodes } from "./useShowEpisodes";
import { fetchShowEpisodes } from "@/services/apiService";
import { waitFor } from "@testing-library/react-native";
import { Episode } from "@/types";
import { Alert } from "react-native";
import { GENERIC_ERROR_MESSAGE } from "@/constants";
import { getStorageItem } from "@/services/persistenceService";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

jest.mock("@/services/apiService", () => ({
  fetchShowEpisodes: jest.fn(),
}));

jest.mock("@/services/persistenceService", () => ({
  getStorageItem: jest.fn(),
}));

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe("useShowEpisodes", () => {
  it("successfully fetches episodes from the API", async () => {
    const mockEpisodes = [{ id: "1", name: "First Episode" }];
    jest.mocked(fetchShowEpisodes).mockResolvedValue(mockEpisodes as Episode[]);

    const { result, waitForNextUpdate } = renderHook(() =>
      useShowEpisodes({ showId: "show123" }),
    );

    await waitForNextUpdate();

    expect(result.current.results).toEqual(mockEpisodes);
    expect(result.current.isLoading).toBeFalsy();
  });

  it("handles errors during fetch and navigates back", async () => {
    jest
      .mocked(fetchShowEpisodes)
      .mockRejectedValue(new Error("Error fetching"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useShowEpisodes({ showId: "show123" }),
    );

    await waitForNextUpdate();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      GENERIC_ERROR_MESSAGE,
      expect.anything(),
      { cancelable: false },
    );
    expect(result.current.isLoading).toBeFalsy();
  });

  it("loads episodes from local storage if available", async () => {
    const cachedEpisodesData = {
      showId: "show123",
      episodes: [{ id: "2", name: "Cached Episode" }],
    };
    jest.mocked(getStorageItem).mockReturnValue(cachedEpisodesData);

    const { result } = renderHook(() => useShowEpisodes({ showId: "show123" }));

    await waitFor(() =>
      expect(result.current.results).toEqual(cachedEpisodesData.episodes),
    );

    expect(result.current.isLoading).toBeFalsy();
  });
});
