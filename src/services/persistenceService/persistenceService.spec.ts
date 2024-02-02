import { setStorageItem, getStorageItem, deleteStorageItem } from "./index";

jest.mock("react-native-mmkv", () => {
  const mockStorage = new Map();
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      set: jest.fn((key, value) => mockStorage.set(key, value)),
      getString: jest.fn((key) => mockStorage.get(key) || null),
      delete: jest.fn((key) => mockStorage.delete(key)),
    })),
  };
});

describe("Storage Utilities", () => {
  const key = "testKey";
  const testData = { a: 1, b: "Test", c: true };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save and retrieve an item correctly", () => {
    setStorageItem(key, testData);
    const item = getStorageItem<typeof testData>(key);
    expect(item).toEqual(testData);
  });

  it("should return null if item does not exist", async () => {
    const item = await getStorageItem("nonExistentKey");
    expect(item).toBeNull();
  });

  it("should delete an item correctly", async () => {
    await setStorageItem(key, testData);
    await deleteStorageItem(key);
    const item = await getStorageItem(key);
    expect(item).toBeNull();
  });
});
