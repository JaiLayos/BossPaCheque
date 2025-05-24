export const fetchNullColumns = async (fileId: string): Promise<{ columns_with_nulls: string[] }> => {
  const response = await fetch(`http://192.168.*.*:5000/check_nulls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileId }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
