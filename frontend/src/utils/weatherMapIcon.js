// src/utils/weatherIcons.js
import Ensolarado from "../assets/pngs/ensolarado.png";
import ParcialmenteNublado from "../assets/pngs/parcialmentenublado.png";
import Nublado from "../assets/pngs/nublado.png";
import Chuva from "../assets/pngs/chuva.png";
import Tempestade from "../assets/pngs/tempestade.png";
import Neve from "../assets/pngs/neve.png";
import Luar from "../assets/pngs/luar.png"


export const weatherIconMap = {
  // ☀️ Céu limpo
  "01d": Ensolarado,
  "01n": Luar, 
  // 🌤️ Parcialmente nublado
  "02d": ParcialmenteNublado,
  "02n": ParcialmenteNublado,

  // ☁️ Nublado
  "03d": Nublado,
  "03n": Nublado,
  "04d": Nublado,
  "04n": Nublado,

  // 🌧️ Chuva
  "09d": Chuva,
  "09n": Chuva,
  "10d": Chuva,
  "10n": Chuva,

  // ⛈️ Tempestade
  "11d": Tempestade,
  "11n": Tempestade,

  // ❄️ Neve
  "13d": Neve,
  "13n": Neve,
};
