import { API_BASE_URL } from "@env";
import { ENDPOINTS } from "@/constants/ApiConfig";

export const uploadFile = async (fileId: string, file: { uri: string; name: string; type: string }) => {
  const formData = new FormData();

  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any); // React Native FormData workaround

  const endpoint = ENDPOINTS.uploadFile.replace("{file_id}", fileId);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return await response.json();
};
