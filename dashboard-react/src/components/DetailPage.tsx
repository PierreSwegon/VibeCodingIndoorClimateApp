import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Thermometer, Droplets, Wind, Activity } from "lucide-react";
import { TemperatureChart } from "./TemperatureChart";
import { HumidityChart } from "./HumidityChart";
import { CO2Chart } from "./CO2Chart";
import { ClimateData, Thresholds } from "../types";
import { filterDataByTime } from "../utils/dataService";

type ViewType = "temperature" | "humidity" | "co2" | "airquality";

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
  const filteredData = filterDataByTime(allData, "24h");

  const getPageConfig = () => {
    switch (view) {
      case "temperature":
        return {
          title: "Temperature",
          icon: <Thermometer className="w-6 h-6" />,
          value: currentData.temperature.toFixed(1),
          unit: "°C",
          color: "from-orange-500 to-red-500",
          chart: <TemperatureChart data={filteredData} />,
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
          chart: <HumidityChart data={filteredData} />,
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
          chart: <CO2Chart data={filteredData} />,
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
          chart: <CO2Chart data={filteredData} />,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
              <h2 className="text-xl font-bold text-gray-900">
                {config.title}
              </h2>
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${config.color} text-white`}
              >
                {config.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {config.value}
              </span>
              {config.unit && (
                <span className="text-xl text-gray-500">{config.unit}</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>History (24 hours)</CardTitle>
          </CardHeader>
          <CardContent>{config.chart}</CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Optimal Value
              </h3>
              <p className="text-sm text-gray-700">{config.info.optimal}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Information
              </h3>
              <p className="text-sm text-gray-700">{config.info.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
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
