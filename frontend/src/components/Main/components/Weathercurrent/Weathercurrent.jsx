import "./WeatherCurrent.css"
import ImageLocation from "../../../../assets/sunny.svg?react"
function WeatherCurrent(){
    return(
        <div className="weather-Current">
            <div className="weather-current__container">
                <div className="weather-current__wrap-one">
                <ImageLocation className="weather-current__image"></ImageLocation>
                <div>
                    <p>Segunda-feira, 23/01</p>
                    <p>Ensolarado</p>
                </div>
                </div>
                   <div className="weather-current__wrap-two">
                    <p>10:20 am</p>
                    <p>Rio de Janeiro</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherCurrent;