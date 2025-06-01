import RNHTMLtoPDF from "react-native-html-to-pdf";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function CheckNullScreen() {
  const { fileUri, fileName, fileType } = useLocalSearchParams<{
    fileUri: string;
    fileName: string;
    fileType: string;
  }>();

  const [nullColumns, setNullColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkNulls = async () => {
    try {
      setLoading(true);
      setError(null);

      const uri = fileUri;

      const uploadResponse = await FileSystem.uploadAsync(
        "http://192.168.1.2:5000/check_nulls",
        uri,
        {
          httpMethod: "POST",
          mimeType: fileType,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file", // must match backend field name
          parameters: {
            filename: fileName,
          },
        }
      );

      const responseJson = JSON.parse(uploadResponse.body);
      setNullColumns(responseJson.columns_with_nulls || []);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to check null columns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkNulls();
  }, []);

  const generatePDF = async () => {
  if (nullColumns.length === 0) {
    setError("No data available to export.");
    return;
  }
    try {
      // Build simple HTML content
      const htmlContent = `
        <h1>Null Columns Report</h1>
        <p>This report was generated on ${new Date().toLocaleString()}</p>
        <h2>Columns with Null Values:</h2>
        <ul>
          ${nullColumns.map(col => `<li>${col}</li>`).join("")}
        </ul>
      `;

      const options = {
        html: htmlContent,
        fileName: "null_columns_report",
        directory: "Documents",
      };

      const { filePath } = await RNHTMLtoPDF.convert(options);

      console.log("PDF generated at:", filePath);
      alert("PDF saved to Documents folder!");
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center mb-4"
              >
                <Feather name="arrow-left" size={24} color="#475569" />
                <ThemedText className="ml-2 text-gray-700">Back</ThemedText>
              </TouchableOpacity>
      {/* Title */}
      <ThemedText type="title" className="text-xl font-bold mb-4">
        Columns with Null Values
      </ThemedText>

      {/* Loading State */}
      {loading ? (
        <View className="flex-1 justify-center items-center py-8">
          <ActivityIndicator size="large" color="#4A90E2" />
          <ThemedText className="mt-4">Checking for null values...</ThemedText>
        </View>
      ) : error ? (
        <View className="bg-red-100 border border-red-300 p-4 rounded-lg">
          <Text className="text-red-700">{error}</Text>
        </View>
      ) : nullColumns.length === 0 ? (
        <View className="bg-green-100 border border-green-300 p-4 rounded-lg mt-4">
          <ThemedText className="text-green-700">
            No null values found in any column!
          </ThemedText>
        </View>
      ) : (
        // List of Null Columns
        <View className="mt-4 space-y-3">
          {nullColumns.map((col, index) => (
            <View
              key={index}
              className="bg-stone-100 p-3 rounded-md border border-stone-300"
            >
              <ThemedText>{col}</ThemedText>
            </View>
          ))}
          <TouchableOpacity
            onPress={generatePDF}
            className="bg-[#3c6e71] py-3 px-6 rounded-lg mb-4 mt-10 self-stretch items-center"
          >
            <Text className="text-white font-bold text-base text-center">
              Download as PDF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#3c6e71] py-3 px-6 rounded-lg mb-4 mt-5 self-stretch items-center"
            onPress={() =>
              router.push({
                pathname: "/checkDuplicates",
                params: {
                  fileUri,
                  fileName,
                  fileType,
                },
              })
            }
          >
            <Text className="text-white font-bold text-base text-center">
              Next
            </Text>
          </TouchableOpacity>
        </View>
        
      )}
    </ScrollView>
  );
}