import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";
import { useRouter } from "expo-router";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/services/ApiService";
import { getColumnsWithNulls } from "@/services/checkNullColumns";
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
      type: ["text/csv"],
    });

    if (!result.canceled && result.assets?.length > 0) {
      const pickedFile = result.assets[0];
      const fileUri = pickedFile.uri;

      try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        const parsed = Papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true,
        });

        const data = parsed.data as Record<string, string>[];
        const colsWithNulls = getColumnsWithNulls(data);

        if (colsWithNulls.length > 0) {
          setNullColumns(colsWithNulls);
          setModalVisible(true);
          setStatus("Found null values in some columns.");
          return;
        }

        const fileId = uuidv4();
        const file = {
          uri: fileUri,
          name: pickedFile.name || "unknown",
          type: pickedFile.mimeType || "text/csv",
        };

        const response = await uploadFile(fileId, file);
        setStatus(`File uploaded: ${response.rows} rows, ${response.columns} columns`);
        router.push({ pathname: "/clean", params: { fileId } });
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
