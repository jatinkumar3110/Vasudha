// components/AdvisoryScreen.tsx
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function AdvisoryScreen() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // Call Whisper or backend API
    console.log('Send:', message);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-semibold">कृषि सहायक चैटबॉट</Text>
      <View className="flex-row items-center border mt-4 rounded-xl px-4">
        <TextInput
          placeholder="अपना सवाल पूछें..."
          className="flex-1 h-12"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
