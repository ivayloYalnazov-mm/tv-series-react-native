import { renderHook, act } from "@testing-library/react-native";
import { DEFAULT_INFINITE_SCROLL_STEP } from "@/constants";
import { useLocalInfiniteScrollData } from "./useLocalInfiniteScrollData";

describe("useLocalInfiniteScrollData", () => {
  const initialData = Array.from({ length: 100 }, (_, i) => i + 1);

  it("should initially return the first DEFAULT_INFINITE_SCROLL_STEP items", () => {
    const { result } = renderHook(() =>
      useLocalInfiniteScrollData(initialData),
    );

    expect(result.current.itemsToRender).toEqual(
      initialData.slice(0, DEFAULT_INFINITE_SCROLL_STEP),
    );
  });

  it("should return more items when loadMoreItems is called", () => {
    const { result } = renderHook(() =>
      useLocalInfiniteScrollData(initialData),
    );

    act(() => {
      result.current.loadMoreItems();
    });

    expect(result.current.itemsToRender).toEqual(
      initialData.slice(0, DEFAULT_INFINITE_SCROLL_STEP * 2),
    );
  });

  it("should not return more items than available when loadMoreItems is called", () => {
    const smallData = initialData.slice(0, DEFAULT_INFINITE_SCROLL_STEP + 5);
    const { result } = renderHook(() => useLocalInfiniteScrollData(smallData));

    act(() => {
      result.current.loadMoreItems();
    });

    expect(result.current.itemsToRender).toEqual(smallData);
  });
});
