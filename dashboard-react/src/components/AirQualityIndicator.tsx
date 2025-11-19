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
      case "Excellent":
        return "bg-green-500";
      case "Good":
        return "bg-lime-500";
      case "Acceptable":
        return "bg-yellow-500";
      case "Moderate":
        return "bg-orange-500";
      case "Poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getQualityPosition = (quality: string) => {
    switch (quality) {
      case "Excellent":
        return "0%";
      case "Good":
        return "25%";
      case "Acceptable":
        return "50%";
      case "Moderate":
        return "75%";
      case "Poor":
        return "95%";
      default:
        return "50%";
    }
  };

  const getRecommendation = (quality: string) => {
    switch (quality) {
      case "Excellent":
        return "Air quality is excellent. Continue with good ventilation.";
      case "Good":
        return "Air quality is good. No action needed at this time.";
      case "Acceptable":
        return "Air quality is acceptable. Consider ventilating soon.";
      case "Moderate":
        return "Air quality is moderate. Recommend ventilating the room.";
      case "Poor":
        return "Air quality is poor. Ventilate the room immediately!";
      default:
        return "";
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="pt-4 pb-4 px-4">
        <div className="space-y-3">
          <div className="text-sm text-gray-900">
            Air Quality:{" "}
            <span
              className={`${getQualityColor(
                quality
              )} bg-opacity-20 px-2 py-0.5 rounded`}
            >
              {quality}
            </span>
          </div>

          <div className="space-y-1">
            <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-900 shadow-lg transition-all duration-500"
                style={{ left: getQualityPosition(quality) }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Excellent</span>
              <span>Poor</span>
            </div>
          </div>

          <div
            className="p-2 rounded-lg border-2"
            style={{ backgroundColor: "#E9F2E5", borderColor: "#277D32" }}
          >
            <p className="text-xs text-gray-700">
              {getRecommendation(quality)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
