import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import './../global.css';


const uploadIcon = Asset.fromModule(require("../../assets/images/upload.png")).uri;


export default function Index() {
  const [fontsLoaded] = useFonts({
    'Source Sans 3': require('../../assets/fonts/SourceSans3-VariableFont_wght.ttf'), // Make sure the path is correct
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  const router = useRouter();

  const next = () => {
    router.push('/explore');
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 border-2 w-full bg-white items-center">
        <View className="h-10 border-2 bg-primary_green w-full" />
        <Pressable className="border-2 border-secondary_nuance w-5/6 mt-5 items-center flex" onPress={next}>
          <View className='flex-col p-8'>
            <Image
              source={{uri:uploadIcon}}
              style={{ width: 190, height: 170 }}
              contentFit='cover'
            />
            <Text className='text-center font-[Source Sans 3]'>Upload and Clean Dataset</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </>
  );
}
