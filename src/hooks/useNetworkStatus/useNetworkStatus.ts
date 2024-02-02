import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetworkStatus = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => unsubscribe();
  }, []);

  return { isOffline };
};

export { useNetworkStatus };
