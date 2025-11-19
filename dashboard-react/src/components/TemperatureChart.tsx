import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ClimateData } from "../types";
import { formatTimestamp } from "../utils/dataService";

interface TemperatureChartProps {
  data: ClimateData[];
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const chartData = data.map((item) => ({
    time: formatTimestamp(item.timestamp, true),
    temperature: item.temperature,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[15, 30]}
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
          label={{
            value: "°C",
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
          formatter={(value: number) => [
            `${value.toFixed(1)}°C`,
            "Temperature",
          ]}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#f97316"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
