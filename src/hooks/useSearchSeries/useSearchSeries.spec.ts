import { renderHook, act } from "@testing-library/react-hooks/native";
import { useSearchSeries } from "./useSearchSeries";
import { searchSeriesByQuery } from "@/services/apiService";
import { ShowData } from "@/types";
import { useNetworkStatus } from "../useNetworkStatus/useNetworkStatus";
import { getStorageItem, setStorageItem } from "@/services/persistenceService";
import { storageKeys } from "@/constants";

jest.mock("@/services/apiService", () => ({
  searchSeriesByQuery: jest.fn(),
}));

jest.mock("@/services/persistenceService", () => ({
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn(),
}));

jest.mock("@/hooks/useNetworkStatus/useNetworkStatus", () => ({
  useNetworkStatus: jest.fn(),
}));

describe("useSearchSeries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = [{ show: { id: "1", name: "Test Show" }, score: 10 }];
    jest.mocked(searchSeriesByQuery).mockResolvedValue(mockData as ShowData[]);
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: false });

    const { result, waitFor } = renderHook(() => useSearchSeries());

    act(() => {
      result.current.setQuery("test");
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.results).toEqual(mockData);
    expect(result.current.hasSearched).toBe(true);
  });

  it("returns cached data when offline", async () => {
    const cachedData = [{ show: { id: "2", name: "Cached Show" }, score: 9 }];
    jest.mocked(getStorageItem).mockReturnValue(cachedData);
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: true });

    const { result } = renderHook(() => useSearchSeries());

    expect(result.current.results).toEqual(cachedData);
    expect(result.current.isLoading).toBe(false);
  });
  it("caches data on successful fetch", async () => {
    const fetchedData = [{ show: { id: "3", name: "Fetched Show" }, score: 8 }];
    jest
      .mocked(searchSeriesByQuery)
      .mockResolvedValue(fetchedData as ShowData[]);
    jest.mocked(useNetworkStatus).mockReturnValue({ isOffline: false });
    jest.mocked(getStorageItem).mockReturnValueOnce([]);

    const { result, waitFor } = renderHook(() => useSearchSeries());

    act(() => {
      result.current.setQuery("fetch");
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(setStorageItem).toHaveBeenLastCalledWith(
      storageKeys.CACHED_SHOWS,
      fetchedData,
    );
  });
});
