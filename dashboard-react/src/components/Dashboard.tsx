import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { MetricCard } from "./MetricCard";
import { AirQualityIndicator } from "./AirQualityIndicator";
import { Thermometer, Droplets, Wind, Activity, ArrowLeft } from "lucide-react";
import { DetailPage } from "./DetailPage";
import { RoomSelection } from "./RoomSelection";
import { Button } from "./ui/button";
import { ClimateData, Thresholds } from "../types";
import {
  loadClimateData,
  loadThresholds,
  getLatestData,
} from "../utils/dataService";

type ViewType =
  | "rooms"
  | "home"
  | "temperature"
  | "humidity"
  | "co2"
  | "airquality";

export function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("rooms");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [allData, setAllData] = useState<ClimateData[]>([]);
  const [thresholds, setThresholds] = useState<Thresholds | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [climateData, thresholdsData] = await Promise.all([
          loadClimateData(selectedRoom || undefined),
          loadThresholds(),
        ]);
        setAllData(climateData);
        setThresholds(thresholdsData);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoom) {
      loadData();
    }
  }, [selectedRoom]);

  function getAirQuality(co2: number): string {
    if (co2 < 600) return "Excellent";
    if (co2 < 800) return "Good";
    if (co2 < 1000) return "Acceptable";
    if (co2 < 1400) return "Moderate";
    return "Poor";
  }

  const getRoomName = (roomId: string): string => {
    const roomNames: { [key: string]: string } = {
      kitchen: "Kitchen",
      "living-room": "Living Room",
      hallway: "Hallway",
      "bedroom-1": "Bedroom 1",
      "bedroom-2": "Bedroom 2",
    };
    return roomNames[roomId] || roomId;
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    setCurrentView("home");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (currentView === "rooms") {
    return <RoomSelection onSelectRoom={handleSelectRoom} />;
  }

  const currentData = getLatestData(allData);

  if (!currentData || !thresholds) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Loading Error
              </h2>
              <p className="text-gray-600">Failed to load climate data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const airQuality = getAirQuality(currentData.co2);

  if (currentView !== "home") {
    return (
      <DetailPage
        view={currentView}
        currentData={{
          temperature: currentData.temperature,
          humidity: currentData.humidity,
          co2: currentData.co2,
          airQuality: airQuality,
        }}
        allData={allData}
        thresholds={thresholds}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <div className="text-center py-4 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("rooms")}
            className="absolute left-0 top-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Rooms
          </Button>
          <h1 className="text-indigo-900">Swegon Road 42</h1>
          <p className="text-sm text-gray-600">{getRoomName(selectedRoom)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setCurrentView("temperature")}
            className="cursor-pointer"
          >
            <MetricCard
              title="Temperature"
              value={currentData.temperature.toFixed(1)}
              unit="°C"
              icon={<Thermometer className="w-5 h-5" />}
              color="orange"
              status={getTemperatureStatus(currentData.temperature, thresholds)}
            />
          </div>
          <div
            onClick={() => setCurrentView("humidity")}
            className="cursor-pointer"
          >
            <MetricCard
              title="Humidity"
              value={currentData.humidity.toFixed(0)}
              unit="%"
              icon={<Droplets className="w-5 h-5" />}
              color="blue"
              status={getHumidityStatus(currentData.humidity, thresholds)}
            />
          </div>
          <div onClick={() => setCurrentView("co2")} className="cursor-pointer">
            <MetricCard
              title="CO₂ Level"
              value={currentData.co2.toFixed(0)}
              unit="ppm"
              icon={<Wind className="w-5 h-5" />}
              color="green"
              status={getCO2Status(currentData.co2, thresholds)}
            />
          </div>
        </div>

        <div className="mt-4 mb-4">
          <AirQualityIndicator quality={airQuality} co2={currentData.co2} />
        </div>
      </div>
    </div>
  );
}

function getAirQuality(co2: number): string {
  if (co2 < 600) return "Excellent";
  if (co2 < 800) return "Good";
  if (co2 < 1000) return "Acceptable";
  if (co2 < 1400) return "Moderate";
  return "Poor";
}

function getTemperatureStatus(
  temp: number,
  thresholds: Thresholds
): "good" | "warning" | "critical" {
  const { min, max } = thresholds.temperature;
  if (temp >= min && temp <= max) return "good";
  if (temp >= min - 2 && temp <= max + 2) return "warning";
  return "critical";
}

function getHumidityStatus(
  humidity: number,
  thresholds: Thresholds
): "good" | "warning" | "critical" {
  const { min, max } = thresholds.humidity;
  if (humidity >= min && humidity <= max) return "good";
  if (humidity >= min - 10 && humidity <= max + 10) return "warning";
  return "critical";
}

function getCO2Status(
  co2: number,
  thresholds: Thresholds
): "good" | "warning" | "critical" {
  const { max } = thresholds.co2;
  if (co2 < max * 0.8) return "good";
  if (co2 < max * 1.2) return "warning";
  return "critical";
}

function getAirQualityStatus(quality: string): "good" | "warning" | "critical" {
  if (quality === "Excellent" || quality === "Good") return "good";
  if (quality === "Acceptable" || quality === "Moderate") return "warning";
  return "critical";
}
