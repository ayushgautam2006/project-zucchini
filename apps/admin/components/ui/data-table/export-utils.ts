/**
 * Utility functions for exporting table data to CSV and Excel formats
 */

/**
 * Convert table data to CSV string
 */
export function convertToCSV<T extends Record<string, unknown>>(
  data: T[],
  headers: { key: string; label: string }[]
): string {
  if (data.length === 0) return "";

  // Create header row
  const headerRow = headers.map((h) => `"${h.label}"`).join(",");

  // Create data rows
  const rows = data.map((item) =>
    headers
      .map((h) => {
        const value = getNestedValue(item, h.key);
        // Escape double quotes and wrap in quotes
        const stringValue = value?.toString() ?? "";
        return `"${stringValue.replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  return [headerRow, ...rows].join("\n");
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/**
 * Download CSV file
 */
export function downloadCSV<T extends Record<string, unknown>>(
  data: T[],
  headers: { key: string; label: string }[],
  filename: string
): void {
  const csv = convertToCSV(data, headers);
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * Create and trigger download of a blob
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Extract headers from TanStack table columns
 */
export function extractHeadersFromTable<T>(table: {
  getAllColumns: () => { id: string; columnDef: { header?: unknown } }[];
}): { key: string; label: string }[] {
  return table
    .getAllColumns()
    .filter((column) => {
      // Skip selection column and actions column
      const id = column.id;
      return id !== "select" && id !== "actions";
    })
    .map((column) => {
      const header = column.columnDef.header;
      let label = column.id;

      // Try to extract string label from header
      if (typeof header === "string") {
        label = header;
      } else if (typeof header === "function") {
        // For function headers, use the column id formatted nicely
        label = column.id
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .trim();
      }

      return { key: column.id, label };
    });
}
