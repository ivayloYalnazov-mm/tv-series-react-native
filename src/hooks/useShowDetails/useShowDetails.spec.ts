import { renderHook } from "@testing-library/react-hooks/native";
import { useShowDetails } from "./useShowDetails";
import { fetchShowById } from "@/services/apiService";
import { waitFor } from "@testing-library/react-native";
import { Show } from "@/types";
import { useNetworkStatus } from "../useNetworkStatus/useNetworkStatus";
import { Alert } from "react-native";
import { GENERIC_ERROR_MESSAGE } from "@/constants";
import { getStorageItem } from "@/services/persistenceService";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

jest.mock("@/services/apiService", () => ({
  fetchShowById: jest.fn(),
}));

jest.mock("@/services/persistenceService", () => ({
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn(),
}));

jest.mock("@/hooks/useNetworkStatus/useNetworkStatus", () => ({
  useNetworkStatus: jest.fn(),
}));

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe("useShowDetails", () => {
  it("fetches and updates details on successful fetch", async () => {
    const showData = { id: "2", name: "Fetched Show" };
    jest.mocked(fetchShowById).mockResolvedValue(showData as Show);
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: false });

    const { result } = renderHook(() => useShowDetails({ showId: "2" }));

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.details).toEqual(showData);
  });

  it("handles fetch error correctly", async () => {
    jest.mocked(fetchShowById).mockRejectedValue(new Error("Fetch error"));
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: false });

    const { result } = renderHook(() => useShowDetails({ showId: "unknown" }));

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      GENERIC_ERROR_MESSAGE,
      expect.anything(),
      { cancelable: false },
    );
  });

  it("returns details from cache when offline", async () => {
    const cachedShow = { show: { id: "1", name: "Cached Show" } };
    jest.mocked(getStorageItem).mockReturnValue([cachedShow]);
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: true });

    const { result } = renderHook(() => useShowDetails({ showId: "1" }));

    await waitFor(() =>
      expect(result.current.details).toEqual(cachedShow.show),
    );
  });
});
