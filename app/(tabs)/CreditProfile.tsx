import { View, Text } from 'react-native';

export default function CreditProfileScreen() {
  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-3">विश्वास प्रोफ़ाइल</Text>
      <Text className="text-sm text-gray-500 mb-5">Your community-validated trust score:</Text>

      <View className="rounded-xl bg-green-100 p-6 shadow-md items-center">
        <Text className="text-4xl font-extrabold text-green-700">84</Text>
        <Text className="text-base mt-2">Credit Score</Text>
      </View>
    </View>
  );
}
