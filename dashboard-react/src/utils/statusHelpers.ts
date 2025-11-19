import { Thresholds, Status } from "../types";

export function getTemperatureStatus(
  temp: number,
  thresholds: Thresholds
): Status {
  const { min, max } = thresholds.temperature;
  if (temp >= min && temp <= max) return "good";
  if (temp >= min - 2 && temp <= max + 2) return "warning";
  return "critical";
}

export function getHumidityStatus(
  humidity: number,
  thresholds: Thresholds
): Status {
  const { min, max } = thresholds.humidity;
  if (humidity >= min && humidity <= max) return "good";
  if (humidity >= min - 10 && humidity <= max + 10) return "warning";
  return "critical";
}

export function getCO2Status(co2: number, thresholds: Thresholds): Status {
  const { max } = thresholds.co2;
  if (co2 < max * 0.8) return "good";
  if (co2 < max * 1.2) return "warning";
  return "critical";
}

export function getAQIStatus(aqi: number, thresholds: Thresholds): Status {
  const { max } = thresholds.aqi;
  if (aqi < max * 0.7) return "good";
  if (aqi < max * 1.2) return "warning";
  return "critical";
}

export function getAirQualityLabel(co2: number): string {
  if (co2 < 600) return "Excellent";
  if (co2 < 800) return "Good";
  if (co2 < 1000) return "Acceptable";
  if (co2 < 1400) return "Moderate";
  return "Poor";
}

export function getAirQualityStatus(quality: string): Status {
  if (quality === "Excellent" || quality === "Good") return "good";
  if (quality === "Acceptable" || quality === "Moderate") return "warning";
  return "critical";
}
