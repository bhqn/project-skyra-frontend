import "./WeatherChart.css"
import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
    { time: "0 AM", temp: 10 },
  { time: "6 AM", temp: 16 },
  { time: "9 AM", temp: 20 },
  { time: "12 PM", temp: 28 },
  { time: "3 PM", temp: 26 },
  { time: "6 PM", temp: 22 },
  { time: "9 PM", temp: 18 },
];

function WeatherChart() {
  return (
    <div className="weather-chart">
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#7a7a7a" }}
          />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#FF9F1C"
            strokeWidth={2}
            dot={{ r: 4, fill: "#fff", stroke: "#FF9F1C", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          >
            <LabelList
              dataKey="temp"
              position="top"
              formatter={(value) => `${value}°`}
              fill="#7a7a7a"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;
