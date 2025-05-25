import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { connectToWebSocket } from "@/services/WebSocketService";

export default function CleanScreen() {
  const router = useRouter();
  const { fileId } = useLocalSearchParams();
  const [status, setStatus] = useState<string>(""); // Status messages
  const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket connection
  const [actions, setActions] = useState<string[]>([
    "handle_nulls",
    "remove_duplicates",
    "check_unique",
    "validate_types",
    "standardize_units",
    "convert_case",
    "undo",
    "export",
    "preview",
  ]); // Backend-suggested actions
  const [column_name, setColumnName] = useState(""); // Column name input
  const [preview, setPreview] = useState<any[]>([]); // Preview data
  const [columnsToClean, setColumnsToClean] = useState<string[]>([]); // Columns to clean based on action
  const [selectedAction, setSelectedAction] = useState<string | null>(null); // Current action

  // Connect to WebSocket on component mount
  useEffect(() => {
    if (fileId) {
      const socket = connectToWebSocket(fileId as string);
      setWs(socket);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.error) setStatus(`Error: ${data.error}`);
        else if (data.status) setStatus(data.status);
        else if (data.suggestedActions) setActions(data.suggestedActions);
        else if (data.preview) setPreview(data.preview);
        else if (data.columns) setColumnsToClean(data.columns); // Update columns dynamically
      };

      socket.onerror = () => setStatus("WebSocket error. Please try again.");
      socket.onclose = () => setStatus("WebSocket closed.");

      return () => socket.close();
    }
  }, [fileId]);

  // Handle WebSocket actions
  const handleAction = (action: string, payload: object = {}) => {
    if (!ws || ws.readyState !== 1) {
      setStatus("WebSocket not connected.");
      return;
    }
    setSelectedAction(action); // Track the current action
    ws.send(JSON.stringify({ action, ...payload }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-2 pt-6">
      {/* Logo */}
      <View className="flex-row items-center mb-2">
        <Image
          source={require('../../assets/images/logo.png')}
          className="w-32 h-10"
          contentFit="contain"
        />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Actions Card */}
        <View className="bg-neutral-900 rounded-2xl p-4 mb-4">
          <Text className="text-white text-lg font-bold mb-2">Actions</Text>
          <View className="flex-row flex-wrap justify-center gap-2">
            {actions.includes("handle_nulls") && (
              <TouchableOpacity
                className="bg-teal-800 rounded-lg p-3 w-[30%] items-center"
                onPress={() => handleAction("handle_nulls", { strategy: "drop" })}
              >
                <Text className="text-white">handle nulls</Text>
              </TouchableOpacity>
            )}
            {actions.includes("remove_duplicates") && (
              <TouchableOpacity
                className="bg-teal-800 rounded-lg p-3 w-[30%] items-center"
                onPress={() => handleAction("remove_duplicates")}
              >
                <Text className="text-white">remove duplicate</Text>
              </TouchableOpacity>
            )}
            {actions.includes("check_unique") && (
              <TouchableOpacity
                className="bg-teal-800 rounded-lg p-3 w-[30%] items-center"
                onPress={() => handleAction("check_unique", { column: column_name })}
              >
                <Text className="text-white">check unique</Text>
              </TouchableOpacity>
            )}
            {actions.includes("validate_types") && (
              <TouchableOpacity
                className="bg-teal-800 rounded-lg p-3 w-[30%] items-center"
                onPress={() => handleAction("validate_types", { column_types: { [column_name]: "int" } })}
              >
                <Text className="text-white">validate types</Text>
              </TouchableOpacity>
            )}
            {actions.includes("standardize_units") && (
              <TouchableOpacity
                className="bg-teal-800 rounded-lg p-3 w-[30%] items-center"
                onPress={() => handleAction("standardize_units", { column: column_name, factor: 1000 })}
              >
                <Text className="text-white">change units</Text>
              </TouchableOpacity>
            )}
            {actions.includes("convert_case") && (
              <TouchableOpacity
                className="bg-teal-800 rounded-lg p-3 w-[30%] items-center"
                onPress={() => handleAction("convert_case", { case: "upper", columns: [column_name] })}
              >
                <Text className="text-white">convert case</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Which columns to clean? */}
        <View className="bg-neutral-900 rounded-2xl p-4 mb-4">
          <Text className="text-white font-bold mb-2">Which columns to clean?</Text>
          <View className="flex-row mb-2">
            <TouchableOpacity
              className="bg-teal-800 rounded-lg px-4 py-2 mr-2"
              onPress={() => setColumnName("")}
            >
              <Text className="text-white">All</Text>
            </TouchableOpacity>
            <View className="flex-row flex-1 items-center bg-white rounded-lg px-2">
              <TextInput
                className="flex-1 text-black"
                placeholder="Search column"
                placeholderTextColor="#888"
                value={column_name}
                onChangeText={setColumnName}
              />
              <Text className="text-black text-xl">🔍</Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-teal-800 rounded-lg py-2 items-center mb-2"
            onPress={() => handleAction("preview")}
          >
            <Text className="text-white">Preview</Text>
          </TouchableOpacity>
        </View>

        {/* Columns with {handle nulls/unit} */}
        <View className="bg-neutral-900 rounded-2xl p-4 mb-4">
          <Text className="text-white font-bold mb-2">
            Columns with {selectedAction ? `{${selectedAction}}` : "{handle nulls/unit}"}
          </Text>
          <View className="bg-white rounded-lg h-24 mb-2 p-2">
            {columnsToClean.length > 0 ? (
              columnsToClean.map((col, idx) => (
                <Text key={idx} className="text-black text-sm mb-1">
                  • {col}
                </Text>
              ))
            ) : (
              <Text className="text-gray-500 text-sm">No columns to display</Text>
            )}
          </View>
        </View>

        {/* Preview Data Section */}
        <View className="bg-neutral-900 rounded-2xl p-4 mb-4">
          <Text className="text-white font-bold mb-2">Preview Data</Text>
          <View className="bg-white rounded-lg h-24 mb-2 p-2">
            {preview.length > 0 ? (
              preview.map((row, idx) => (
                <Text key={idx} className="text-black text-sm mb-1">
                  {JSON.stringify(row)}
                </Text>
              ))
            ) : (
              <Text className="text-gray-500 text-sm">No preview data available</Text>
            )}
          </View>
        </View>

        {/* Status and Export/Preview Buttons */}
        <Text className="text-black text-center mb-2">{status || "status if cleaned or not"}</Text>
        <View className="flex-row justify-between mb-2">
          <TouchableOpacity
            className="bg-teal-800 rounded-lg flex-1 py-2 mx-1 items-center"
            onPress={() => handleAction("undo")}
          >
            <Text className="text-white">undo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-teal-800 rounded-lg flex-1 py-2 mx-1 items-center"
            onPress={() => handleAction("clean", { column: column_name })}
          >
            <Text className="text-white">clean</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-teal-800 rounded-lg py-2 items-center mb-4"
          onPress={() => handleAction("export")}
        >
          <Text className="text-white">Export</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}