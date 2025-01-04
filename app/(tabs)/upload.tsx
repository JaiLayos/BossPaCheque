import React, { useState } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { HapticTab } from '@/components/HapticTab';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function Upload() {
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const upload = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
      });

      if (!upload.canceled && upload.assets.length > 0) {
        const file = upload.assets[0];  
        setFileUri(file.uri); 
        setFileName(file.name);  

        console.log("URI:", file.uri);
        console.log("File:", file.name);

        const storeFileUri = FileSystem.documentDirectory + file.name;
        await FileSystem.copyAsync({
          from: file.uri,
          to: storeFileUri,
        });
        console.log("File copied to local storage:", storeFileUri);
      } else {
        console.log('User canceled the picker or no file selected');
      }
    } catch (err) {
      console.error("Error picking the file:", err);
    }
  };

  return (
    
    <SafeAreaView className="flex-1 border-2 w-full bg-white items-center py-12">
      <Image
        className="w-40 h-16 px-4 mb-10 ml-4 self-start"
        source={require('@/assets/images/logo.png')}
      />

      <View className="bg-primary_green w-4/5 h-3/5 rounded-lg p-6 items-center">
        <HapticTab className="border-2 bg-primary_green border-secondary_nuance px-8 py-4 rounded-lg mb-6"
        onPress={pickFile}>
          <ThemedText
            fontFamily='sourceSans3Italic'
            type='title'
            style={{ color: 'white' }}
          >
            UPLOAD
          </ThemedText>
        </HapticTab>
        <ThemedText 
          className="text-center mt-4 bg-primary_green"
          style={{ color: 'white' }}
        >
          Attach the dataset {'\n'}(.xls, .csv)
        </ThemedText>
      </View>
      
    </SafeAreaView>
  );
}
