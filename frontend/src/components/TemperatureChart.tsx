import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import type { LogEntry } from "../models/SensorData";

interface ChartProps {
  data: LogEntry[];
}

export const TemperatureChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = [...data].reverse();

  return (
    <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mt-8 h-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-bold uppercase tracking-tighter text-lg">
          Tendencia Térmica <span className="text-indigo-500">Real-Time</span>
        </h3>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>{" "}
            Temperatura (°C)
          </span>
        </div>
      </div>

      <div className="w-full h-75">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={300}
          minHeight={200}
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="timestamp"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={[15, 35]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "15px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="sensors.temperature"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTemp)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
