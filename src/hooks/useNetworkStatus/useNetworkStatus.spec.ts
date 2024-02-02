import { renderHook, act } from "@testing-library/react-native";
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";
import { useNetworkStatus } from "./useNetworkStatus";

jest.mock("@react-native-community/netinfo", () => ({
  addEventListener: jest.fn(() => jest.fn()),
}));

const mockedNetInfo = NetInfo as jest.Mocked<typeof NetInfo>;

describe("useNetworkStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedNetInfo.addEventListener.mockClear();
  });

  it("should initially be online", () => {
    mockedNetInfo.addEventListener.mockImplementation(
      (callback): NetInfoSubscription => {
        const unsubscribe: NetInfoSubscription = jest.fn();
        callback({
          isConnected: true,
          isInternetReachable: true,
        } as NetInfoState);
        return unsubscribe;
      },
    );

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOffline).toBe(false);
  });

  it("should detect offline status", () => {
    let callback: (state: NetInfoState) => void;
    mockedNetInfo.addEventListener.mockImplementation((cb) => {
      callback = cb;
      return jest.fn();
    });

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      callback({
        isConnected: false,
        isInternetReachable: false,
      } as NetInfoState);
    });

    expect(result.current.isOffline).toBe(true);
  });

  it("should detect online status after being offline", () => {
    let callback: (state: NetInfoState) => void;
    mockedNetInfo.addEventListener.mockImplementation((cb) => {
      callback = cb;
      return jest.fn();
    });

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      callback({
        isConnected: false,
        isInternetReachable: false,
      } as NetInfoState);
    });

    expect(result.current.isOffline).toBe(true);

    act(() => {
      callback({
        isConnected: true,
        isInternetReachable: true,
      } as NetInfoState);
    });

    expect(result.current.isOffline).toBe(false);
  });
});
