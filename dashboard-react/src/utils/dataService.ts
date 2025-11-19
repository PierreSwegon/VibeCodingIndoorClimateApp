import { ClimateData, Thresholds } from "../types";

export async function loadClimateData(roomId?: string): Promise<ClimateData[]> {
  const dataFiles: { [key: string]: string } = {
    kitchen: "/mock_climate_data.json",
    "living-room": "/living_room_data.json",
    hallway: "/hallway_data.json",
    "bedroom-1": "/bedroom1_data.json",
    "bedroom-2": "/bedroom2_data.json",
  };

  const fileName = roomId ? dataFiles[roomId] : "/mock_climate_data.json";
  const response = await fetch(fileName);
  if (!response.ok) {
    throw new Error("Failed to load climate data");
  }
  return response.json();
}

export async function loadThresholds(): Promise<Thresholds> {
  const response = await fetch("/thresholds.json");
  if (!response.ok) {
    throw new Error("Failed to load thresholds");
  }
  return response.json();
}

export function filterDataByTime(
  data: ClimateData[],
  filter: "24h" | "7d"
): ClimateData[] {
  if (data.length === 0) return [];

  const hoursToShow = filter === "24h" ? 24 : 168;

  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return sortedData.slice(-hoursToShow);
}

export function getLatestData(data: ClimateData[]): ClimateData | null {
  if (data.length === 0) return null;
  return data[data.length - 1];
}

export function formatTimestamp(
  timestamp: string,
  compact: boolean = false
): string {
  const date = new Date(timestamp);
  if (compact) {
    return `${date.getHours().toString().padStart(2, "0")}:00`;
  }
  return date.toLocaleString("sv-SE", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
