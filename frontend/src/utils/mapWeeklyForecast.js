import { weatherIconMap } from "./weatherMapIcon";

// trabalha com forecast do endpoint /forecast (5 dias / 3h)
export default function mapWeeklyForecast(forecast) {
  if (!forecast?.list?.length) return [];

  const byDay = new Map();

  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000);

    // chave do dia (ex: 26/01/2026)
    const key = date.toLocaleDateString("pt-BR");

    // preferir o registro das 12:00 (fica mais “representativo” do dia)
    const isNoon = item.dt_txt?.includes("12:00:00");

    if (!byDay.has(key) || isNoon) {
      byDay.set(key, item);
    }
  }

  return Array.from(byDay.values()).slice(0, 7 ).map((item) => {
    const date = new Date(item.dt * 1000);
    const iconCode = item.weather?.[0]?.icon;
    const Icon = weatherIconMap[iconCode];

    return {
      name: date.toLocaleDateString("pt-BR", { weekday: "long" }), // seg, ter, qua...
      temp: `${Math.round(item.main?.temp)}°C`,
      iconCode,
      Icon,
    };
  });
}
