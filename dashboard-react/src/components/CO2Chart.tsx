import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ClimateData } from "../types";
import { formatTimestamp } from "../utils/dataService";

interface CO2ChartProps {
  data: ClimateData[];
}

export function CO2Chart({ data }: CO2ChartProps) {
  const chartData = data.map((item) => ({
    time: formatTimestamp(item.timestamp, true),
    co2: item.co2,
  }));

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[0, 1400]}
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
          label={{
            value: "ppm",
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
          formatter={(value: number) => [`${value.toFixed(0)} ppm`, "CO2"]}
        />
        <ReferenceLine
          y={800}
          stroke="#10b981"
          strokeDasharray="5 5"
          label={{
            value: "Recommended Limit",
            position: "insideTopRight",
            fontSize: 12,
            fill: "#10b981",
          }}
        />
        <ReferenceLine
          y={1000}
          stroke="#f59e0b"
          strokeDasharray="5 5"
          label={{
            value: "Warning Level",
            position: "insideTopRight",
            fontSize: 12,
            fill: "#f59e0b",
          }}
        />
        <Line
          type="monotone"
          dataKey="co2"
          stroke="#10b981"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
