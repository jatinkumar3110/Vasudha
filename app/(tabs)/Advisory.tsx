import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function AdvisoryScreen() {
  const [message, setMessage] = useState('');

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-semibold">कृषि सलाह चैटबॉट</Text>
      <View className="mt-5 flex-row border rounded-lg px-4 py-2 items-center">
        <TextInput
          placeholder="माइक से बोलें या टाइप करें..."
          className="flex-1"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity>
          <Ionicons name="mic" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
