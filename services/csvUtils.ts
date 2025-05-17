import Papa from "papaparse";

export async function parseCSVFile(uri: string): Promise<Record<string, string>[]> {
  const response = await fetch(uri);
  const text = await response.text();

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data as Record<string, string>[];
}

export function getColumnsWithNulls(data: Record<string, string>[]): string[] {
  const columns = Object.keys(data[0] || {});
  return columns.filter(col =>
    data.some(row => row[col] == null || row[col].trim() === "")
  );
}
