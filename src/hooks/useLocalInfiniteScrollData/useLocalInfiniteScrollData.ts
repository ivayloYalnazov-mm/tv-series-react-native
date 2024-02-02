import { DEFAULT_INFINITE_SCROLL_STEP } from "@/constants";
import { useState, useMemo } from "react";

const useLocalInfiniteScrollData = <T>(data: T[]) => {
  const [itemsToShow, setItemsToShow] = useState(DEFAULT_INFINITE_SCROLL_STEP);

  const loadMoreItems = () =>
    setItemsToShow(
      (previousValue) => previousValue + DEFAULT_INFINITE_SCROLL_STEP,
    );

  const itemsToRender = useMemo(
    () => data.slice(0, itemsToShow),
    [data, itemsToShow],
  );

  return { itemsToRender, loadMoreItems };
};

export { useLocalInfiniteScrollData };
