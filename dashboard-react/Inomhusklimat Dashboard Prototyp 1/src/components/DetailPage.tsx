import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Thermometer, Droplets, Wind, Activity } from "lucide-react";
import { TemperatureChart } from "./TemperatureChart";
import { HumidityChart } from "./HumidityChart";
import { CO2Chart } from "./CO2Chart";

type ViewType = "temperature" | "humidity" | "co2" | "airquality";

interface DetailPageProps {
  view: ViewType;
  currentData: {
    temperature: number;
    humidity: number;
    co2: number;
    airQuality: string;
  };
  onBack: () => void;
}

export function DetailPage({ view, currentData, onBack }: DetailPageProps) {
  const getPageConfig = () => {
    switch (view) {
      case "temperature":
        return {
          title: "Temperatur",
          icon: <Thermometer className="w-6 h-6" />,
          value: currentData.temperature.toFixed(1),
          unit: "°C",
          color: "from-orange-500 to-red-500",
          chart: <TemperatureChart />,
          info: {
            optimal: "20-23°C",
            description: "Idealtemperaturen för inomhusmiljö ligger mellan 20-23°C. Temperaturer utanför detta intervall kan påverka komfort och produktivitet.",
            tips: [
              "För hög: Justera termostat eller öppna fönster",
              "För låg: Öka värmen eller stäng fönster",
              "Jämn temperatur: Kontrollera luftcirkulation"
            ]
          }
        };
      case "humidity":
        return {
          title: "Luftfuktighet",
          icon: <Droplets className="w-6 h-6" />,
          value: currentData.humidity.toFixed(0),
          unit: "%",
          color: "from-blue-500 to-cyan-500",
          chart: <HumidityChart />,
          info: {
            optimal: "40-60%",
            description: "Optimal luftfuktighet ligger mellan 40-60%. För låg fuktighet kan orsaka torra slemhinnor, medan för hög fuktighet kan leda till mögelproblem.",
            tips: [
              "För hög: Använd avfuktare eller vädra",
              "För låg: Använd luftfuktare",
              "Kontrollera: Placera fuktighetsmätare i rummet"
            ]
          }
        };
      case "co2":
        return {
          title: "CO2-nivå",
          icon: <Wind className="w-6 h-6" />,
          value: currentData.co2.toFixed(0),
          unit: "ppm",
          color: "from-green-500 to-emerald-500",
          chart: <CO2Chart />,
          info: {
            optimal: "Under 800 ppm",
            description: "CO2-nivåer under 800 ppm anses vara bra. Högre nivåer kan orsaka trötthet, huvudvärk och minskad koncentration.",
            tips: [
              "Hög nivå: Vädra rummet omedelbart",
              "Prevention: Vädra regelbundet",
              "Långsiktig: Överväg mekanisk ventilation"
            ]
          }
        };
      case "airquality":
        return {
          title: "Luftkvalitet",
          icon: <Activity className="w-6 h-6" />,
          value: currentData.airQuality,
          unit: "",
          color: "from-purple-500 to-pink-500",
          chart: <CO2Chart />,
          info: {
            optimal: "Utmärkt - Bra",
            description: "Luftkvaliteten baseras främst på CO2-nivåer och andra faktorer. God luftkvalitet är viktig för hälsa och välbefinnande.",
            tips: [
              "Dålig kvalitet: Vädra omedelbart",
              "Förebyggande: Regelbunden ventilation",
              "Underhåll: Byt luftfilter regelbundet"
            ]
          }
        };
    }
  };

  const config = getPageConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header with back button */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Tillbaka
          </Button>
        </div>

        {/* Title and current value */}
        <Card className="overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${config.color}`} />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">{config.title}</h2>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${config.color} text-white`}>
                {config.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-gray-900">{config.value}</span>
              {config.unit && <span className="text-gray-500">{config.unit}</span>}
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Historik (24 timmar)</CardTitle>
          </CardHeader>
          <CardContent>
            {config.chart}
          </CardContent>
        </Card>

        {/* Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="text-blue-900 mb-1">Optimalt värde</h3>
              <p className="text-gray-700">{config.info.optimal}</p>
            </div>
            <div>
              <h3 className="text-blue-900 mb-1">Information</h3>
              <p className="text-sm text-gray-700">{config.info.description}</p>
            </div>
            <div>
              <h3 className="text-blue-900 mb-2">Rekommenderade åtgärder</h3>
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
