  //Nascer e por do sol
export function formatTime(unixSeconds) {
  if (!unixSeconds) return "--";
  const d = new Date(unixSeconds * 1000); // <- seconds -> ms
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

//hora atual
  export function getCurrentHour() {
  const now = new Date()
  return now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  })
}

// dia / mes
export function getDayAndMonth() {
  return new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit"
  })
}


// dia da semana
 export function getWeekDayShort() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "short"
  })
}

 export function getWeekDayLong() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long"
  })
}


