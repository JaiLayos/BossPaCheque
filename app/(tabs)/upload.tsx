import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker"; // ✅ Keep this import
import { uploadFile } from "@/services/ApiService";
import { useRouter } from "expo-router"; // ✅ Import useRouter for navigation
import { ThemedText } from "@/components/ThemedText";
import Feather from "@expo/vector-icons/Feather";
import { v4 as uuidv4 } from "uuid"; // ✅ Ensure uuid is installed

export default function Upload() {
  const [status, setStatus] = useState<string>("");
  const router = useRouter(); // ✅ Initialize router for navigation

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const pickedFile = result.assets[0];
    
      const file = {
        uri: pickedFile.uri,
        name: pickedFile.name || "unknown",
        type: pickedFile.mimeType || "application/octet-stream",
      };
    
      const fileId = uuidv4();
    
      try {
        const response = await uploadFile(fileId, file);
        setStatus(`File uploaded successfully: ${response.rows} rows, ${response.columns} columns`);
        router.push({ pathname: "/clean", params: { fileId } });
      } catch (error) {
        setStatus("File upload failed.");
        console.error(error);
      }
    } else {
      setStatus("File selection canceled.");
    }
  };

  return (
    <SafeAreaView className="flex-1 w-full bg-white items-center py-12">
      <Image
        className="w-40 h-16 px-4 mb-10 ml-4 mt-5 self-start"
        source={require("@/assets/images/logo.png")}
      />

      <View className="bg-stone-100 w-4/5 h-fit rounded-lg p-6 items-center border border-stone-300">
        <TouchableOpacity
          className="border-2 bg-stone border-stone-300 px-12 py-4 rounded-lg mb-6"
          onPress={handleFileUpload}
        >
          <View className="flex-row items-center">
            <Feather name="upload" size={24} color="stone"/>
            <ThemedText
              fontFamily="sourceSans3Italic"
              type="title"
              className="text-stone-900 ml-4"
            >
              UPLOAD
            </ThemedText>
          </View>
        </TouchableOpacity>
        <ThemedText className="text-center text-white mt-4 bg-stone">
          Attach the dataset {"\n"}(.xls, .csv)
        </ThemedText>
        {status ? (
          <Text className="text-center text-black mt-4">{status}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}