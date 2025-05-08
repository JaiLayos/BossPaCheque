import { ENDPOINTS } from "@/constants/ApiConfig";

export const connectToWebSocket = (fileId: string) => {
  const ws = new WebSocket(
    `${process.env.EXPO_PUBLIC_API_BASE_URL?.replace("http", "ws")}${ENDPOINTS.websocketCleaner.replace("{file_id}", fileId)}`
  );

  ws.onopen = () => {
    console.log("WebSocket connection established.");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message from server:", data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed.");
  };

  return ws;
};