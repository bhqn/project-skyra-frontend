import "./Forecast.css"
import ForecastImage from "../../../../assets/sunny.svg?react"
function Forecast (){
    return(
        <section className="forecast">
            <p className="forecast__title">Previsão da semana</p>
            <div className="forecast__card">
                <div className="forecast__card-iten">
                    <p className="forecast__card-title">Segunda</p>
                    <ForecastImage className="forecast__card-image"></ForecastImage>
                    <p className="forecast__card-temp">32C°</p>
                </div>
                <div className="forecast__card-iten">
                    <p className="forecast__card-title">Terça</p>
                    <ForecastImage className="forecast__card-image"></ForecastImage>
                    <p className="forecast__card-temp">32C°</p>
                </div>
                <div className="forecast__card-iten">
                    <p className="forecast__card-title">Quarta</p>
                    <ForecastImage className="forecast__card-image"></ForecastImage>
                    <p className="forecast__card-temp">32C°</p>
                </div>
                <div className="forecast__card-iten">
                    <p className="forecast__card-title">Quinta</p>
                    <ForecastImage className="forecast__card-image"></ForecastImage>
                    <p className="forecast__card-temp">32C°</p>
                </div>
                <div className="forecast__card-iten">
                    <p className="forecast__card-title">Sexta</p>
                    <ForecastImage className="forecast__card-image"></ForecastImage>
                    <p className="forecast__card-temp">32C°</p>
                </div>
                   <div className="forecast__card-iten">
                    <p className="forecast__card-title">Sabado</p>
                    <ForecastImage className="forecast__card-image"></ForecastImage>
                    <p className="forecast__card-temp">32C°</p>
                </div>
                <div className="forecast__card-iten">
                    <p className="forecast__card-title">Domingo</p>
                    <ForecastImage className="forecast__card-image"></ForecastImage>
                    <p className="forecast__card-temp">32C°</p>
                </div>
                
                

            </div>
        </section>
    )
}

export default Forecast;
