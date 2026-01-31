import "./WeatherChart.css";
import { useMemo } from "react";
import mapHourlyForecast from "../../../../../utils/mapHourlyForecast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function WeatherChart({ forecast, selectedDayKey }) {

  //   - Se o dia tiver menos de 8 medições (caso comum no "hoje"), completa com as próximas medições do forecast

  const filteredForecast = useMemo(() => {
    if (!forecast?.list?.length) return null;

    const fullList = forecast.list;

    // sem dia selecionado -> próximas 8 medições
    if (!selectedDayKey) {
      return { ...forecast, list: fullList.slice(0, 8) };
    }

    // pega só os itens do dia selecionado
    const dayList = fullList.filter((item) =>
      item.dt_txt.startsWith(selectedDayKey)
    );

    // se não achou nada, cai no padrão (evita gráfico vazio)
    if (!dayList.length) {
      return { ...forecast, list: fullList.slice(0, 8) };
    }

    // se tem poucos pontos (muito comum no dia atual), completa com os próximos do forecast
    if (dayList.length < 8) {
      const lastTxt = dayList[dayList.length - 1]?.dt_txt;
      const lastIndex = fullList.findIndex((x) => x.dt_txt === lastTxt);

      const missing = 8 - dayList.length;
      const extra =
        lastIndex >= 0 ? fullList.slice(lastIndex + 1, lastIndex + 1 + missing) : [];

      return { ...forecast, list: [...dayList, ...extra] };
    }

    return { ...forecast, list: dayList };
  }, [forecast, selectedDayKey]);

  const chartData = useMemo(() => {
    if (!filteredForecast) return [];
    return mapHourlyForecast(filteredForecast);
  }, [filteredForecast]);

  if (!chartData.length) return null;

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
