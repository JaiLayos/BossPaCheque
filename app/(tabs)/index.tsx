import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import './../global.css';
import { HapticTab } from '@/components/HapticTab';
import { ThemedText } from '@/components/ThemedText';

const uploadIcon = Asset.fromModule(require("@/assets/images/upload.png")).uri;
const helpIcon = Asset.fromModule(require("@/assets/images/whatsthis.png")).uri;

export default function Index() {

  return (
    <SafeAreaView className="flex-1 w-full bg-white items-center py-12">
      <HapticTab 
        className="border-2 border-secondary_nuance w-5/6 mt-5 items-center flex rounded-xl" 
        onPress={() => router.navigate('/upload')}
      >
        <View className='flex-col p-8'>
          <Image
            source={{uri:uploadIcon}}
            style={{ width: 190, height: 170 }}
            contentFit='cover'
          />
          {/* implementation of new font */}
          <ThemedText  
            fontFamily='spaceMonoRegular'
            className='text-center'
          >
            <ThemedText className='color-blue-900'>Upload </ThemedText> 
            and 
            <ThemedText className='color-blue-900'> Clean </ThemedText> 
            Dataset
          </ThemedText>
        </View>
      </HapticTab>
      <HapticTab
        className="border-2 border-secondary_nuance w-5/6 mt-5 items-center flex rounded-xl" 
        onPress={() => router.navigate('/help')}
      >
        <View className='flex-col p-8'>
          <Image
            source={{uri:helpIcon}}
            style={{ width: 190, height: 170 }}
            contentFit='cover'
          />
          {/* implementation of new font */}
          <ThemedText className={`text-center font-spaceMonoRegular`}>
            <ThemedText className='color-blue-900'>How </ThemedText> 
            to use this app?
          </ThemedText>
        </View>
      </HapticTab>
    </SafeAreaView>
  );
}
