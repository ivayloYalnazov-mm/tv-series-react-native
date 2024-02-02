import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const setStorageItem = <T>(key: string, data: T) => {
  storage.set(key, JSON.stringify(data));
};

const getStorageItem = <T>(key: string): T => {
  const dataString = storage.getString(key);
  return dataString ? JSON.parse(dataString) : null;
};

const deleteStorageItem = (key: string) => {
  storage.delete(key);
};

export { setStorageItem, getStorageItem, deleteStorageItem };
