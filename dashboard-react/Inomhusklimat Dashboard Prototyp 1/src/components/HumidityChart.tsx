import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function HumidityChart() {
  // Generera mock-data för 24 timmar
  const generateData = () => {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const humidity = 45 + Math.sin(i / 4) * 10 + Math.random() * 5;
      data.push({
        time: `${hour.getHours().toString().padStart(2, "0")}:00`,
        humidity: parseFloat(humidity.toFixed(0)),
      });
    }
    return data;
  };

  const data = generateData();

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data}>
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
          tickFormatter={(value, index) => (index % 6 === 0 ? value : "")}
        />
        <YAxis
          domain={[0, 100]}
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
          formatter={(value: number) => [`${value}%`, "Luftfuktighet"]}
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