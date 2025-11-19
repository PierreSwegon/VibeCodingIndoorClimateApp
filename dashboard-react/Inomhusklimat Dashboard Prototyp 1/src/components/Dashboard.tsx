import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MetricCard } from "./MetricCard";
import { TemperatureChart } from "./TemperatureChart";
import { HumidityChart } from "./HumidityChart";
import { CO2Chart } from "./CO2Chart";
import { AirQualityIndicator } from "./AirQualityIndicator";
import { Thermometer, Droplets, Wind, Activity } from "lucide-react";
import { DetailPage } from "./DetailPage";
import { RoomSelection } from "./RoomSelection";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type ViewType = "rooms" | "home" | "temperature" | "humidity" | "co2" | "airquality";

export function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("rooms");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [currentData, setCurrentData] = useState({
    temperature: 22.5,
    humidity: 45,
    co2: 650,
    airQuality: "Bra",
  });

  // Simulera realtidsuppdateringar
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData({
        temperature: 20 + Math.random() * 6,
        humidity: 35 + Math.random() * 25,
        co2: 400 + Math.random() * 800,
        airQuality: getAirQuality(400 + Math.random() * 800),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function getAirQuality(co2: number): string {
    if (co2 < 600) return "Utmärkt";
    if (co2 < 800) return "Bra";
    if (co2 < 1000) return "Acceptabel";
    if (co2 < 1400) return "Måttlig";
    return "Dålig";
  }

  const getRoomName = (roomId: string): string => {
    const roomNames: { [key: string]: string } = {
      "kitchen": "Kök",
      "living-room": "Vardagsrum",
      "hallway": "Hall",
      "bedroom-1": "Sovrum 1",
      "bedroom-2": "Sovrum 2",
    };
    return roomNames[roomId] || roomId;
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    setCurrentView("home");
  };

  // Om vi är på rumsval-sidan
  if (currentView === "rooms") {
    return <RoomSelection onSelectRoom={handleSelectRoom} />;
  }

  // Om vi är på en detaljsida, visa den
  if (currentView !== "home") {
    return (
      <DetailPage
        view={currentView}
        currentData={currentData}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  // Annars visa landningssidan
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-4 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("rooms")}
            className="absolute left-0 top-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Rum
          </Button>
          <h1 className="text-indigo-900">Aspgatan 28</h1>
          <p className="text-sm text-gray-600">
            {getRoomName(selectedRoom)}
          </p>
        </div>

        {/* Metrics Grid - Compact for mobile */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          <div onClick={() => setCurrentView("temperature")} className="cursor-pointer">
            <MetricCard
              title="Temperatur"
              value={currentData.temperature.toFixed(1)}
              unit="°C"
              icon={<Thermometer className="w-5 h-5" />}
              color="orange"
              status={getTemperatureStatus(currentData.temperature)}
            />
          </div>
          <div onClick={() => setCurrentView("humidity")} className="cursor-pointer">
            <MetricCard
              title="Luftfuktighet"
              value={currentData.humidity.toFixed(0)}
              unit="%"
              icon={<Droplets className="w-5 h-5" />}
              color="blue"
              status={getHumidityStatus(currentData.humidity)}
            />
          </div>
          <div onClick={() => setCurrentView("co2")} className="cursor-pointer">
            <MetricCard
              title="CO2-nivå"
              value={currentData.co2.toFixed(0)}
              unit="ppm"
              icon={<Wind className="w-5 h-5" />}
              color="green"
              status={getCO2Status(currentData.co2)}
            />
          </div>
          <div onClick={() => setCurrentView("airquality")} className="cursor-pointer">
            <MetricCard
              title="Luftkvalitet"
              value={currentData.airQuality}
              unit=""
              icon={<Activity className="w-5 h-5" />}
              color="purple"
              status={getAirQualityStatus(currentData.airQuality)}
            />
          </div>
        </div>

        {/* Air Quality Indicator - Compact */}
        <div className="mt-4 mb-4">
          <AirQualityIndicator
            quality={currentData.airQuality}
            co2={currentData.co2}
          />
        </div>
      </div>
    </div>
  );
}

function getTemperatureStatus(temp: number): "good" | "warning" | "critical" {
  if (temp >= 20 && temp <= 23) return "good";
  if (temp >= 18 && temp <= 26) return "warning";
  return "critical";
}

function getHumidityStatus(humidity: number): "good" | "warning" | "critical" {
  if (humidity >= 40 && humidity <= 60) return "good";
  if (humidity >= 30 && humidity <= 70) return "warning";
  return "critical";
}

function getCO2Status(co2: number): "good" | "warning" | "critical" {
  if (co2 < 800) return "good";
  if (co2 < 1200) return "warning";
  return "critical";
}

function getAirQualityStatus(
  quality: string
): "good" | "warning" | "critical" {
  if (quality === "Utmärkt" || quality === "Bra") return "good";
  if (quality === "Acceptabel" || quality === "Måttlig") return "warning";
  return "critical";
}