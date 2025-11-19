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
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Air Quality Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="grid grid-cols-5 text-xs text-gray-600 px-1">
            <span className="text-left">Excellent</span>
            <span className="text-center">Good</span>
            <span className="text-center">OK</span>
            <span className="text-center">Moderate</span>
            <span className="text-right">Poor</span>
          </div>
          <div className="relative h-6 md:h-8 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full border-2 md:border-4 border-gray-900 shadow-lg transition-all duration-500"
              style={{ left: getQualityPosition(quality) }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3 md:p-4 rounded-lg ${getQualityColor(
              quality
            )} bg-opacity-10 border-2 ${getQualityColor(
              quality
            )} border-opacity-30`}
          >
            <div className="text-xs text-gray-600 mb-1">Current Status</div>
            <div className="text-base md:text-xl font-semibold text-gray-900">
              {quality}
            </div>
          </div>
          <div className="p-3 md:p-4 rounded-lg bg-gray-100 border-2 border-gray-200">
            <div className="text-xs text-gray-600 mb-1">CO2 Level</div>
            <div className="text-base md:text-xl font-semibold text-gray-900">
              {co2.toFixed(0)} ppm
            </div>
          </div>
        </div>

        <div className="p-3 md:p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-xs md:text-sm text-gray-700">
            {getRecommendation(quality)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
