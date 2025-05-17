export function getColumnsWithNulls(data: Record<string, string>[]): string[] {
  const columns = Object.keys(data[0] || {});
  const colsWithNulls: string[] = [];

  for (const col of columns) {
    const hasNull = data.some(row => row[col] == null || row[col].trim() === "");
    if (hasNull) colsWithNulls.push(col);
  }

  return colsWithNulls;
}
