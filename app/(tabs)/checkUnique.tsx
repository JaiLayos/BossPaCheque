import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import Collapsible from "react-native-collapsible";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

// TypeScript interface for API response
type UniqueValueItem = {
  column_name: string;
  unique_values: [string | number, number][];
};

export default function CheckUniqueScreen() {
  const { fileUri, fileName, fileType } = useLocalSearchParams<{
    fileUri: string;
    fileName: string;
    fileType: string;
  }>();

  const [expandedColumn, setExpandedColumn] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uniqueData, setUniqueData] = useState<UniqueValueItem[]>([]);

  const fetchUniqueValues = async () => {
    try {
      setLoading(true);
      setError(null);

      const uploadResponse = await FileSystem.uploadAsync(
        "http://192.168.1.2:5000/check_uniques",
        fileUri,
        {
          httpMethod: "POST",
          mimeType: fileType,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file", // Must match backend field name
          parameters: {
            filename: fileName,
          },
        }
      );

      const responseJson = JSON.parse(uploadResponse.body);
      setUniqueData(responseJson.data || []);
    } catch (err) {
      console.error("Error fetching unique values:", err);
      setError("Failed to fetch unique values.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniqueValues();
  }, []);

  // Render each column section
  const renderColumnItem = ({ item }: { item: UniqueValueItem }) => {
    const isExpanded = expandedColumn === item.column_name;

    return (
      <View className="mb-4 border border-stone-300 rounded-lg overflow-hidden">
        {/* Column Header */}
        <TouchableOpacity
          onPress={() =>
            setExpandedColumn(isExpanded ? null : item.column_name)
          }
          className="bg-stone-100 px-4 py-3 flex-row justify-between items-center"
        >
          <ThemedText className="font-bold">{item.column_name}</ThemedText>
          <Feather name={isExpanded ? "chevron-up" : "chevron-down"} size={20} />
        </TouchableOpacity>

        {/* Collapsible Content */}
        <Collapsible collapsed={!isExpanded} duration={0}>
          {isExpanded && (
            <View className="bg-white px-4 py-2">
              {item.unique_values.map(([value, count], index) => (
                <View
                  key={index}
                  className="py-2 border-b border-stone-200"
                >
                  <Text className="text-gray-800">
                    {value}: {count} reiterations
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Collapsible>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white p-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center mb-6"
      >
        <Feather name="arrow-left" size={24} color="#475569" />
        <ThemedText className="ml-2 text-gray-700">Back</ThemedText>
      </TouchableOpacity>

      {/* Title */}
      <ThemedText type="title" className="text-xl font-bold mb-4">
        Unique Values Count
      </ThemedText>

      {/* Loading / Error / Empty States */}
      {loading ? (
        <View className="flex-1 justify-center items-center py-8">
          <Text>Loading unique values...</Text>
        </View>
      ) : error ? (
        <View className="bg-red-100 border border-red-300 p-4 rounded-lg mb-4">
          <Text className="text-red-700">{error}</Text>
        </View>
      ) : uniqueData.length === 0 ? (
        <View className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg mb-4">
          <Text className="text-yellow-800">No unique value stats found.</Text>
        </View>
      ) : null}

      {/* Data List */}
      {!loading && !error && uniqueData.length > 0 && (
        <FlatList
          data={uniqueData}
          keyExtractor={(item) => item.column_name}
          renderItem={renderColumnItem}
          contentContainerClassName="flex-grow"
        />
      )}

      {/* Next Button - Fixed at bottom */}
      {!loading && uniqueData.length > 0 && (
        <TouchableOpacity
          className="bg-[#3c6e71] py-3 px-6 rounded-lg self-stretch items-center mt-auto"
          onPress={() => router.push("/clean")}
        >
          <Text className="text-white font-bold text-base text-center">
            Next
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}