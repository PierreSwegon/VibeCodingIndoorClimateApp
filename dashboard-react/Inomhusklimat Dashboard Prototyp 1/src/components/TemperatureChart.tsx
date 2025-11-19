import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function TemperatureChart() {
  // Generera mock-data för 24 timmar
  const generateData = () => {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const temp = 21 + Math.sin(i / 3) * 2 + Math.random() * 1;
      data.push({
        time: `${hour.getHours().toString().padStart(2, "0")}:00`,
        temperature: parseFloat(temp.toFixed(1)),
      });
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
          tickFormatter={(value, index) => (index % 6 === 0 ? value : "")}
        />
        <YAxis
          domain={[18, 26]}
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
          formatter={(value: number) => [`${value}°C`, "Temperatur"]}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#f97316"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}