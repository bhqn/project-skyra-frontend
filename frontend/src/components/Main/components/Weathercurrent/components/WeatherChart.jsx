import "./WeatherChart.css";
import  mapHourlyForecast  from "../../../../../utils/mapHourlyForecast"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function WeatherChart({ forecast }) {
  const chartData = mapHourlyForecast(forecast);
  return (
    <div className="weather-chart">
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            interval={0}
            padding={{ left: 12, right: 12 }}
            tick={{ fontSize: 12, fill: "#7a7a7a" }}
          />

          <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#FF9F1C"
            strokeWidth={2}
            dot={{ r: 4, fill: "#fff", stroke: "#FF9F1C", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          >
            <LabelList
              offset={8}
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
