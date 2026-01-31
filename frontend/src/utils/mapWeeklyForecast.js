
export default function mapWeeklyForecast(forecast) {
  if (!forecast?.list?.length) return [];

  const byDay = new Map();

  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000);

    // YYYY-MM-DD (estável)
    const key = item.dt_txt
      ? item.dt_txt.slice(0, 10)
      : date.toISOString().slice(0, 10);

    // preferir o registro das 12:00
    const isNoon = item.dt_txt?.includes("12:00:00");

    if (!byDay.has(key) || isNoon) {
      byDay.set(key, item);
    }
  }

  // transforma o map em array ordenado por data
  const days = Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dayKey, item]) => {
      const date = new Date(item.dt * 1000);

      const weekDayShort = date.toLocaleDateString("pt-BR", { weekday: "short" });
      const name = weekDayShort.replace(".", ""); // "seg." -> "seg"

      return {
        dayKey, // "YYYY-MM-DD"
        name,   // "seg", "ter", ...
        temp: Math.round(item.main?.temp ?? 0),
        description: item.weather?.[0]?.description ?? "",
        iconCode: item.weather?.[0]?.icon ?? "",
      };
    });

  // OpenWeather free normalmente dá ~5 dias
  return days.slice(0, 5);
}