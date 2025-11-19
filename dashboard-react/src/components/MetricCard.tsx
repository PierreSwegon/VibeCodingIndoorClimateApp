import { Card, CardContent } from "./ui/card";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: ReactNode;
  color: "orange" | "blue" | "green" | "purple";
  status: "good" | "warning" | "critical";
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  color,
  status,
}: MetricCardProps) {
  const colorClasses = {
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
  };

  const statusColors = {
    good: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    critical: "bg-red-100 text-red-800 border-red-300",
  };

  const statusText = {
    good: "Good",
    warning: "Warning",
    critical: "Critical",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg active:scale-95 h-full flex flex-col">
      <div className={`h-1 bg-gradient-to-r ${colorClasses[color]}`} />
      <CardContent className="pt-3 pb-3 px-3 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <div className="text-xs text-gray-600">{title}</div>
          <div
            className={`p-1.5 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white`}
          >
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          <div
            className={`inline-block px-1.5 py-0.5 rounded-full text-xs border ${statusColors[status]}`}
          >
            {statusText[status]}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
