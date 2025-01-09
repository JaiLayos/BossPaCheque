import React from 'react';
import { SafeAreaView, TouchableOpacity, StatusBar, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { HapticTab } from '@/components/HapticTab';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';


export default function Upload() {

  const handleUpload = () => {
    console.log('Upload button clicked');
    router.push('/mismatched');
  };
  
  return (
    
    <SafeAreaView className="flex-1 border-2 w-full bg-white items-center justify-center py-12">
      <Image
        className="w-40 h-16 px-4 mb-10 ml-4 self-start"
        source={require('@/assets/images/logo.png')}
      />

      <View className="bg-stone-100 w-4/5 h-4/5 rounded-lg p-6 items-center ">
        <HapticTab className="border-2 bg-teal-800 border-white px-12 py-4 rounded-lg mb-6"
        onPress={handleUpload} 
        >
          <View className="flex-row items-center">
          <Feather name="download" size={24} color="#1c1917"/>
            <ThemedText
              fontFamily='sourceSans3Italic'
              type='title'
              className= "text-stone-900 ml-4"
            >
              UPLOAD
            </ThemedText>
          </View>
        </HapticTab>
        <ThemedText 
          className="text-center text-white mt-4 bg-white"
        >
          Attatch the dataset {'\n'}(.xls, .csv)
        </ThemedText>
      </View>
      
    </SafeAreaView>
  );
}
