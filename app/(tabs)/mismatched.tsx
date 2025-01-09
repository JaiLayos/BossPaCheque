import React from 'react';
import { SafeAreaView, View, Image, Text,FlatList} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { HapticTab } from '@/components/HapticTab';

export default function Mismatched() {
  const words = ['Word 1', 'Word 2', 'Word 3'];

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
       <Image
        className="w-40 h-16 mt-8 mb-4 self-start ml-4"  // Align image to the start (left) with margin on the left
        source={require('@/assets/images/logo.png')}
      />

      <View className="bg-gray-100 w-11/12 rounded-lg p-6">
        <Text className="text-xl font-bold text-black mb-4">
          Mismatched words
        </Text>
        <Text className="text-sm text-gray-600 mb-6">
          Click the word that you want to edit. The changes will reflect to all
          the cells containing this word.
        </Text>

        <FlatList
          data={words}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <HapticTab className="flex-row items-center p-4 bg-white rounded-lg shadow-sm mb-4">
              <View className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                <Text className="text-lg font-bold text-gray-800">A</Text>
              </View>
              <Text className="ml-4 text-black text-base">{item}</Text>
            </HapticTab>
          )}
        />

        <View className="flex-row justify-between mt-6">
          <HapticTab className="bg-gray-300 rounded-lg px-4 py-2">
            <Text className="text-black text-base">Replace all the values</Text>
          </HapticTab>
          <HapticTab className="bg-gray-300 rounded-lg px-4 py-2">
            <Text className="text-black text-base">Keep all the values</Text>
          </HapticTab>
        </View>
      </View>
    </SafeAreaView>
  );
}