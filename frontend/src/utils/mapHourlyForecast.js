//funcao de horas do dia

export default function mapHourlyForecast(forecast) {
  if (!forecast || !forecast.list) return [];

  return forecast.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(item.main.temp),
  }));
}

