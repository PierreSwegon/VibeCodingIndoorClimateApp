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

type TimeRange = "24h" | "7d";

interface CO2ChartProps {
  timeRange: TimeRange;
}

export function CO2Chart({ timeRange }: CO2ChartProps) {
  // Generera mock-data för 24 timmar eller 7 dagar
  const generateData = () => {
    const data = [];
    const now = new Date();
    
    if (timeRange === "24h") {
      for (let i = 23; i >= 0; i--) {
        const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
        // Simulera högre CO2 under arbetstid (8-17)
        const hourOfDay = hour.getHours();
        let baseCO2 = 450;
        if (hourOfDay >= 8 && hourOfDay <= 17) {
          baseCO2 = 650 + Math.sin((hourOfDay - 8) / 2) * 200;
        }
        const co2 = baseCO2 + Math.random() * 100;
        data.push({
          time: `${hour.getHours().toString().padStart(2, "0")}:00`,
          co2: parseFloat(co2.toFixed(0)),
        });
      }
    } else {
      // 7 dagar
      for (let i = 6; i >= 0; i--) {
        const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const co2 = 550 + Math.sin(i / 2) * 150 + Math.random() * 200;
        data.push({
          time: day.toLocaleDateString("sv-SE", { weekday: "short" }),
          co2: parseFloat(co2.toFixed(0)),
        });
      }
    }
    return data;
  };

  const data = generateData();

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
          tickFormatter={timeRange === "24h" ? (value, index) => (index % 6 === 0 ? value : "") : undefined}
        />
        <YAxis
          domain={[0, 1400]}
          tick={{ fontSize: 10 }}
          stroke="#6b7280"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value: number) => [`${value} ppm`, "CO2"]}
        />
        <ReferenceLine
          y={800}
          stroke="#10b981"
          strokeDasharray="5 5"
          label={{ value: "Rekommenderad", position: "insideTopRight", fontSize: 10 }}
        />
        <ReferenceLine
          y={1000}
          stroke="#f59e0b"
          strokeDasharray="5 5"
          label={{ value: "Varning", position: "insideTopRight", fontSize: 10 }}
        />
        <Line
          type="monotone"
          dataKey="co2"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}