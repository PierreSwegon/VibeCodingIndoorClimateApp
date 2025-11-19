export interface ClimateData {
  timestamp: string;
  temperature: number;
  humidity: number;
  co2: number;
  aqi: number;
  occupancy: number;
}

export interface Thresholds {
  temperature: { min: number; max: number; unit: string };
  humidity: { min: number; max: number; unit: string };
  co2: { max: number; unit: string };
  aqi: { max: number; unit: string };
  occupancy: { max: number; unit: string };
}

export type Metric = "temperature" | "humidity" | "co2" | "aqi" | "occupancy";

export type TimeFilter = "24h" | "7d";

export type Status = "good" | "warning" | "critical";
