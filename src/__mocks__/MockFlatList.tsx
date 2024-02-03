import { View } from "react-native";

interface MockFlatListProps {
  data: { id: string }[];
  containerTestID: string;
  itemPrefixTestID: string;
}

const MockFlatList = ({
  data,
  containerTestID,
  itemPrefixTestID,
}: MockFlatListProps) => (
  <View testID={containerTestID}>
    {data.map((item) => (
      <View key={item.id} testID={`${itemPrefixTestID}-${item.id}`}></View>
    ))}
  </View>
);

export { MockFlatList };
