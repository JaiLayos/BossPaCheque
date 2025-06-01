// app/checkDuplicates.tsx

import React, { useEffect, useState, memo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Collapsible from "react-native-collapsible";
import _ from "lodash";

type DuplicationItem = {
  column: string;
  duplicated_value: string | number;
  frequency: number;
  max_frequency: number;
  variance: number;
};

const DetailRow = memo(({ item }: { item: DuplicationItem }) => {
  return (
    <View className="px-6 py-2 bg-slate-50 border-t border-slate-200">
      <ThemedText>Frequency: {item.frequency}</ThemedText>
      <ThemedText>Max Frequency: {item.max_frequency}</ThemedText>
      <ThemedText>Variance: {item.variance}</ThemedText>
    </View>
  );
});

export default function CheckDuplicatesScreen() {
  const { fileUri, fileName, fileType } = useLocalSearchParams<{
    fileUri: string;
    fileName: string;
    fileType: string;
  }>();

  const [duplicationStats, setDuplicationStats] = useState<DuplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedColumn, setExpandedColumn] = useState<string | null>(null);
  const [expandedValue, setExpandedValue] = useState<string | null>(null);

  const checkDuplicates = async () => {
    try {
      setLoading(true);
      setError(null);

      const uploadResponse = await FileSystem.uploadAsync(
        "http://192.168.1.2:5000/check_duplicates",
        fileUri,
        {
          httpMethod: "POST",
          mimeType: fileType,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file",
          parameters: {
            filename: fileName,
          },
        }
      );

      const responseJson = JSON.parse(uploadResponse.body);
      setDuplicationStats(responseJson.duplication_stats || []);
    } catch (err) {
      console.error("Error checking duplicates:", err);
      setError("Failed to fetch duplicate data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkDuplicates();
  }, []);

  // Helper to render summary stats
  const renderSummary = () => {
    const grouped = _.groupBy(duplicationStats, "column");
    const totalColumns = Object.keys(grouped).length;
    const columnsWithDuplicates = Object.values(grouped).filter(items => items.length > 0).length;

    return (
      <View className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
        <ThemedText className="text-blue-800 font-bold text-base">Summary</ThemedText>
        <ThemedText className="mt-1">Total Columns Checked: {totalColumns}</ThemedText>
        <ThemedText>Columns With Duplicates: {columnsWithDuplicates}</ThemedText>
      </View>
    );
  };

  // Render each column group
  const renderColumnItem = ({ item }: { item: [string, DuplicationItem[]] }) => {
    const [column, items] = item;
    const isColumnExpanded = expandedColumn === column;

    return (
      <View className="mb-4 border border-stone-300 rounded-lg overflow-hidden">
        {/* Column Header */}
        <TouchableOpacity
          onPress={() => setExpandedColumn(isColumnExpanded ? null : column)}
          className="bg-stone-100 px-4 py-3 flex-row justify-between items-center"
        >
          <ThemedText className="font-bold">{column}</ThemedText>
          <Feather name={isColumnExpanded ? "chevron-up" : "chevron-down"} size={20} />
        </TouchableOpacity>

        {/* Top-level Collapsible */}
        <Collapsible collapsed={!isColumnExpanded} duration={0}>
          {isColumnExpanded && (
            <>
              {/* Grouped by duplicated_value */}
              <FlatList
                data={_.toPairs(_.groupBy(items, "duplicated_value"))}
                keyExtractor={([value]) => `${column}-${value}`}
                renderItem={({ item: [value, valueItems] }) => {
                  const isValueExpanded = expandedValue === value;

                  return (
                    <View className="border-t border-stone-200" key={value}>
                      <TouchableOpacity
                        onPress={() => setExpandedValue(isValueExpanded ? null : value)}
                        className="bg-white px-5 py-2 flex-row justify-between items-center"
                      >
                        <ThemedText>"{value}" ({valueItems.length})</ThemedText>
                        <Feather name={isValueExpanded ? "chevron-up" : "chevron-down"} size={18} />
                      </TouchableOpacity>

                      {/* Nested Collapsible */}
                      <Collapsible collapsed={!isValueExpanded} duration={0}>
                        {isValueExpanded && (
                          <>
                            {valueItems.map((item, index) => (
                              <DetailRow key={index} item={item} />
                            ))}
                          </>
                        )}
                      </Collapsible>
                    </View>
                  );
                }}
                // Optional: Add extra optimizations
                initialNumToRender={10}
                maxToRenderPerBatch={10}
              />
            </>
          )}
        </Collapsible>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-6 border-b border-gray-200 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mb-4"
        >
          <Feather name="arrow-left" size={24} color="#475569" />
          <ThemedText className="ml-2 text-gray-700">Back</ThemedText>
        </TouchableOpacity>

        <ThemedText type="title" className="text-xl font-bold">
          Duplicate Detection Results
        </ThemedText>
      </View>

      {/* Content */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* Loading State */}
            {loading ? (
              <View className="p-6 items-center">
                <Text>Loading duplication stats...</Text>
              </View>
            ) : error ? (
              <View className="p-4 bg-red-100 border border-red-300 rounded-lg m-4">
                <Text className="text-red-700">{error}</Text>
              </View>
            ) : duplicationStats.length === 0 ? (
              <View className="p-4 bg-green-100 border border-green-300 rounded-lg m-4">
                <ThemedText className="text-green-700">
                  No duplicates found!
                </ThemedText>
              </View>
            ) : (
              renderSummary()
            )}
          </>
        }
        data={Object.entries(_.groupBy(duplicationStats, "column"))}
        keyExtractor={([column]) => column}
        renderItem={renderColumnItem}
        contentContainerClassName="p-6"
      />

      {/* Next Button - Fixed at bottom */}
      {!loading && duplicationStats.length > 0 && (
        <View className="p-6 border-t border-gray-200 bg-white">
          <TouchableOpacity
                      className="bg-[#3c6e71] py-3 px-6 rounded-lg mb-4 mt-5 self-stretch items-center"
                      onPress={() =>
                        router.push({
                          pathname: "/checkUnique",
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
    </View>
  );
}