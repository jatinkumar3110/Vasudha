import { View, Text, FlatList } from 'react-native';

const markets = [
  { name: 'Mandi A', price: '₹22/kg', crop: 'Wheat' },
  { name: 'Mandi B', price: '₹24/kg', crop: 'Wheat' },
];

export default function MarketScreen() {
  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">बाजार दरें और भंडारण</Text>

      <FlatList
        data={markets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="border rounded-lg p-3 mb-3 bg-gray-50">
            <Text className="font-semibold">{item.name}</Text>
            <Text>Crop: {item.crop}</Text>
            <Text>Rate: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
