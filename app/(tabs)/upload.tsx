import React from 'react';
import { SafeAreaView, TouchableOpacity, StatusBar, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';


export default function Upload() {

  return (
    
    <SafeAreaView className="flex-1 border-2 w-full bg-white items-center justify-center py-12">
      <Image
        className="w-40 h-16 px-4 mb-10 ml-4 self-start"
        source={require('@/assets/images/logo.png')}
      />

      <View className="bg-stone-900 w-4/5 h-4/5 rounded-lg p-6 items-center ">
        <TouchableOpacity className="border-2 bg-teal-800 border-white px-8 py-4 rounded-lg mb-6">
          <ThemedText
            fontFamily='sourceSans3Italic'
            type='title'
          >
            UPLOAD
          </ThemedText>
        </TouchableOpacity>
        <ThemedText 
          className="text-center text-white mt-4 bg-white"
        >
          Attatch the dataset {'\n'}(.xls, .csv)
        </ThemedText>
      </View>
      
    </SafeAreaView>
  );
}
