import { View, Text, ScrollView } from 'react-native';

export default function LandMatchingScreen() {
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-3">बंजर ज़मीन सुझाव</Text>
      <Text className="text-sm text-gray-500 mb-5">Nearby available plots based on your needs:</Text>

      {/* Placeholder Cards */}
      <View className="border rounded-lg p-4 mb-4 bg-gray-100">
        <Text className="font-semibold">Plot #1</Text>
        <Text>Area: 0.75 acre</Text>
        <Text>Distance: 2.3 km</Text>
      </View>

      <View className="border rounded-lg p-4 mb-4 bg-gray-100">
        <Text className="font-semibold">Plot #2</Text>
        <Text>Area: 1.2 acre</Text>
        <Text>Distance: 4.1 km</Text>
      </View>
    </ScrollView>
  );
}
