import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TextInput, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { connectToWebSocket } from "@/services/WebSocketService";

export default function CleanScreen() {
  const router = useRouter();
  const { fileId } = useLocalSearchParams();
  const [status, setStatus] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [actions, setActions] = useState<string[]>([
    "handle_nulls",
    "remove_duplicates",
    "check_unique",
    "detect_misspellings",
    "validate_types",
    "standardize_units",
    "convert_case",
    "undo",
    "export",
    "preview"
  ]); // Store suggested actions from the backend
  const [columnName, setColumnName] = useState("");
  const [preview, setPreview] = useState<any[]>([]);

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
      };

      socket.onerror = () => setStatus("WebSocket error. Please try again.");
      socket.onclose = () => setStatus("WebSocket closed.");

      return () => socket.close();
    }
  }, [fileId]);

  const handleAction = (action: string, payload: object = {}) => {
    if (ws) ws.send(JSON.stringify({ action, ...payload }));
  };

  return (
    <SafeAreaView>\
      <TextInput
        placeholder="Column name"
        value={columnName}
        onChangeText={setColumnName}
        style={{ borderWidth: 1, margin: 8, padding: 4 }}
      />
      {actions.includes("handle_nulls") && (
        <Button title="Handle Nulls" onPress={() => handleAction("handle_nulls", { strategy: "drop" })} />
      )}
      {actions.includes("remove_duplicates") && (
        <Button title="Remove Duplicates" onPress={() => handleAction("remove_duplicates")} />
      )}
      {actions.includes("check_unique") && (
        <Button title="Check Unique" onPress={() => handleAction("check_unique", { column: "column_name" })} />
      )}
      {actions.includes("detect_misspellings") && (
        <Button title="Detect Misspellings" onPress={() => handleAction("detect_misspellings", { column: "column_name" })} />
      )}
      {actions.includes("validate_types") && (
        <Button title="Validate Types" onPress={() => handleAction("validate_types", { column_types: { column_name: "int" } })} />
      )}
      {actions.includes("standardize_units") && (
        <Button title="Standardize Units" onPress={() => handleAction("standardize_units", { column: "column_name", factor: 1000 })} />
      )}
      {actions.includes("convert_case") && (
        <Button title="Convert Case" onPress={() => handleAction("convert_case", { case: "upper", columns: ["column_name"] })} />
      )}
      {actions.includes("undo") && (
        <Button title="Undo" onPress={() => handleAction("undo")} />
      )}
      {actions.includes("export") && (
        <Button title="Export" onPress={() => handleAction("export")} />
      )}
      {actions.includes("preview") && (
        <Button title="Preview Data" onPress={() => handleAction("preview")} />
      )}
      <Text>{status}</Text>
      {preview.length > 0 && (
        <View>
          <Text>Preview:</Text>
          {preview.map((row, idx) => (
            <Text key={idx}>{JSON.stringify(row)}</Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}