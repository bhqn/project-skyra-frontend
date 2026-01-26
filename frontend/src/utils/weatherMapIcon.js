// src/utils/weatherIcons.js
import Ensolarado from "../assets/Ensolarado.svg?react";
import ParcialmenteNublado from "../assets/parcialmentenublado.svg?react";
import Nublado from "../assets/nublado.svg?react";
import Chuva from "../assets/chuva.svg?react";
import Tempestade from "../assets/tempestade.svg?react";
import Neve from "../assets/Neve.svg?react";
import Luar from "../assets/luar.svg?react"


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
