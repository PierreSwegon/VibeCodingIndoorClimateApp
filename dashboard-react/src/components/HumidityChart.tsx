import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ClimateData } from "../types";
import { formatTimestamp } from "../utils/dataService";

interface HumidityChartProps {
  data: ClimateData[];
}

export function HumidityChart({ data }: HumidityChartProps) {
  const chartData = data.map((item) => ({
    time: formatTimestamp(item.timestamp, true),
    humidity: item.humidity,
  }));

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
          label={{
            value: "%",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 10 },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [`${value.toFixed(0)}%`, "Humidity"]}
        />
        <Area
          type="monotone"
          dataKey="humidity"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#humidityGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
