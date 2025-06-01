import 'react-native-get-random-values';
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { NullColumnsModal } from "@/components/NullColumnsModal";
import { ThemedText } from "@/components/ThemedText";
import Feather from "@expo/vector-icons/Feather";

export default function Upload() {
  const [status, setStatus] = useState<string>("");
  const [nullColumns, setNullColumns] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", 
    });

    if (!result.canceled && result.assets?.length > 0) {
      const pickedFile = result.assets[0];
      const fileUri = pickedFile.uri;
      const fileName = pickedFile.name || "";
      const isCsv = fileName.toLowerCase().endsWith(".csv") || pickedFile.mimeType === "text/csv";

      if (!isCsv) {
        setStatus("Only CSV files are supported. Please select a .csv file.");
        return;
      }

      try {
        const file = {
          uri: fileUri,
          name: pickedFile.name || "unknown",
          type: pickedFile.mimeType || "text/csv",
        };
        router.push({
          pathname: "/checkNull",
          params: {
            fileUri: file.uri,
            fileName: pickedFile.name || "unknown.csv",
            fileType: pickedFile.mimeType || "text/csv",
          },
        });
      } catch (error) {
        setStatus("Error processing file.");
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
            <Feather name="upload" size={24} color="stone" />
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
          Attach the dataset {"\n"}(.csv)
        </ThemedText>

        {status ? <Text className="text-center text-black mt-4">{status}</Text> : null}
      </View>

      {/* Floating Modal */}
      <NullColumnsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        nullColumns={nullColumns}
      />
    </SafeAreaView>
  );
}