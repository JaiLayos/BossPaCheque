import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';


export default function Upload() {

  return (
    
    <SafeAreaView className="flex-1 border-2 w-full bg-white items-center justify-center py-12">
      <ThemedText
        fontFamily='sourceSans3Italic'
        type='title'
      >
        UPLOAD
      </ThemedText>
      
    </SafeAreaView>
  );
}
