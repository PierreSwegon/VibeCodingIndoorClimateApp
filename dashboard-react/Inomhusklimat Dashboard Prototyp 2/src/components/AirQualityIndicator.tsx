import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AirQualityIndicatorProps {
  quality: string;
  co2: number;
}

export function AirQualityIndicator({
  quality,
  co2,
}: AirQualityIndicatorProps) {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Utmärkt":
        return "bg-green-500";
      case "Bra":
        return "bg-lime-500";
      case "Acceptabel":
        return "bg-yellow-500";
      case "Måttlig":
        return "bg-orange-500";
      case "Dålig":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getQualityPosition = (quality: string) => {
    switch (quality) {
      case "Utmärkt":
        return "0%";
      case "Bra":
        return "25%";
      case "Acceptabel":
        return "50%";
      case "Måttlig":
        return "75%";
      case "Dålig":
        return "95%";
      default:
        return "50%";
    }
  };

  const getRecommendation = (quality: string) => {
    switch (quality) {
      case "Utmärkt":
        return "Luftkvaliteten är utmärkt. Fortsätt med god ventilation.";
      case "Bra":
        return "Luftkvaliteten är bra. Inga åtgärder behövs för tillfället.";
      case "Acceptabel":
        return "Luftkvaliteten är acceptabel. Överväg att vädra snart.";
      case "Måttlig":
        return "Luftkvaliteten är måttlig. Rekommenderar vädring av rummet.";
      case "Dålig":
        return "Luftkvaliteten är dålig. Vädra rummet omedelbart!";
      default:
        return "";
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="pt-4 pb-4 px-4">
        <div className="space-y-3">
          <div className="text-sm text-gray-900">Luftkvalitet: <span className={`${getQualityColor(quality)} bg-opacity-20 px-2 py-0.5 rounded`}>{quality}</span></div>
          
          <div className="space-y-1">
            <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-900 shadow-lg transition-all duration-500"
                style={{ left: getQualityPosition(quality) }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Utmärkt</span>
              <span>Dålig</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-xs text-gray-700">{getRecommendation(quality)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}