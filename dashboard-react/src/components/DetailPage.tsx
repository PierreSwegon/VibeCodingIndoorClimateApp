import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Thermometer, Droplets, Wind, Activity } from "lucide-react";
import { TemperatureChart } from "./TemperatureChart";
import { HumidityChart } from "./HumidityChart";
import { CO2Chart } from "./CO2Chart";
import { ClimateData, Thresholds } from "../types";
import { filterDataByTime } from "../utils/dataService";
import { useState } from "react";

type ViewType = "temperature" | "humidity" | "co2" | "airquality";
type TimeRange = "24h" | "7d";

interface DetailPageProps {
  view: ViewType;
  currentData: {
    temperature: number;
    humidity: number;
    co2: number;
    airQuality: string;
  };
  allData: ClimateData[];
  thresholds: Thresholds;
  onBack: () => void;
}

export function DetailPage({
  view,
  currentData,
  allData,
  thresholds,
  onBack,
}: DetailPageProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const filteredData = filterDataByTime(allData, timeRange);

  const getPageConfig = () => {
    switch (view) {
      case "temperature":
        return {
          title: "Temperature",
          icon: <Thermometer className="w-6 h-6" />,
          value: currentData.temperature.toFixed(1),
          unit: "°C",
          color: "from-orange-500 to-red-500",
          chart: <TemperatureChart data={filteredData} timeRange={timeRange} />,
          info: {
            optimal: `${thresholds.temperature.min}-${thresholds.temperature.max}°C`,
            description:
              "The ideal indoor temperature ranges between 20-23°C. Temperatures outside this range can affect comfort and productivity.",
            tips: [
              "Too high: Adjust thermostat or open windows",
              "Too low: Increase heating or close windows",
              "Consistent temperature: Check air circulation",
            ],
          },
        };
      case "humidity":
        return {
          title: "Humidity",
          icon: <Droplets className="w-6 h-6" />,
          value: currentData.humidity.toFixed(0),
          unit: "%",
          color: "from-blue-500 to-cyan-500",
          chart: <HumidityChart data={filteredData} timeRange={timeRange} />,
          info: {
            optimal: `${thresholds.humidity.min}-${thresholds.humidity.max}%`,
            description:
              "Optimal humidity is between 40-60%. Low humidity can cause dry mucous membranes, while high humidity can lead to mold problems.",
            tips: [
              "Too high: Use dehumidifier or ventilate",
              "Too low: Use humidifier",
              "Monitor: Place humidity sensor in the room",
            ],
          },
        };
      case "co2":
        return {
          title: "CO₂ Level",
          icon: <Wind className="w-6 h-6" />,
          value: currentData.co2.toFixed(0),
          unit: "ppm",
          color: "from-green-500 to-emerald-500",
          chart: <CO2Chart data={filteredData} timeRange={timeRange} />,
          info: {
            optimal: `Below ${thresholds.co2.max} ppm`,
            description:
              "CO₂ levels below 800 ppm are considered good. Higher levels can cause fatigue, headaches, and decreased concentration.",
            tips: [
              "High level: Ventilate room immediately",
              "Prevention: Ventilate regularly",
              "Long-term: Consider mechanical ventilation",
            ],
          },
        };
      case "airquality":
        return {
          title: "Air Quality",
          icon: <Activity className="w-6 h-6" />,
          value: currentData.airQuality,
          unit: "",
          color: "from-purple-500 to-pink-500",
          chart: <CO2Chart data={filteredData} timeRange={timeRange} />,
          info: {
            optimal: "Excellent - Good",
            description:
              "Air quality is primarily based on CO₂ levels and other factors. Good air quality is important for health and well-being.",
            tips: [
              "Poor quality: Ventilate immediately",
              "Prevention: Regular ventilation",
              "Maintenance: Replace air filters regularly",
            ],
          },
        };
    }
  };

  const config = getPageConfig();

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${config.color}`} />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">{config.title}</h2>
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${config.color} text-white`}
              >
                {config.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-gray-900">{config.value}</span>
              {config.unit && (
                <span className="text-gray-500">{config.unit}</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>History</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={timeRange === "24h" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("24h")}
                >
                  24h
                </Button>
                <Button
                  variant={timeRange === "7d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange("7d")}
                >
                  7d
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>{config.chart}</CardContent>
        </Card>

        <Card
          className="border-2"
          style={{ backgroundColor: "#E9F2E5", borderColor: "#277D32" }}
        >
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="mb-1" style={{ color: "#277D32" }}>
                Optimal Value
              </h3>
              <p className="text-gray-700">{config.info.optimal}</p>
            </div>
            <div>
              <h3 className="mb-1" style={{ color: "#277D32" }}>
                Information
              </h3>
              <p className="text-sm text-gray-700">{config.info.description}</p>
            </div>
            <div>
              <h3 className="mb-2" style={{ color: "#277D32" }}>
                Recommended Actions
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {config.info.tips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
