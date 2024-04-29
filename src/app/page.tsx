"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import './api/weather/animation/loading.css'

export default function Home() {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState("Colombia");

  const iconMapping = {
    "01d": "wi-owm-day-800", // día soleado
    "01n": "wi-owm-night-800", // noche clara
    "02d": "wi-owm-day-802", // día nublado con ráfagas
    "02n": "wi-owm-night-802", // noche nublada con ráfagas
    "03d": "wi-owm-day-803", // día nublado
    "03n": "wi-owm-night-803", // noche nublada
    "04d": "wi-owm-day-804", // nublado
    "04n": "wi-owm-night-804", // noche nublada
    "09d": "wi-owm-day-501", // lluvia
    "09n": "wi-owm-night-501", // lluvia nocturna
    "10d": "wi-owm-day-502", // lluvia intensa
    "10n": "wi-owm-night-502", // lluvia intensa nocturna
    "11d": "wi-owm-day-210", // relámpago
    "11n": "wi-owm-night-210", // relámpago nocturno
    "13d": "wi-owm-day-600", // nieve
    "13n": "wi-owm-night-600", // nieve nocturna
    "50d": "wi-owm-day-741", // niebla
    "50n": "wi-owm-night-741" // niebla nocturna
  };

  async function fetchData(cityName) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}
          className={styles.weatherLocation}
        >
          <input
            className={styles.input_field}
            type="text"
            placeholder="Consulte aquí su ciudad"
            id="cityName"
            name="cityName"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className={styles.search_button} type="submit">
            Buscar
          </button>
        </form>
        {weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                <i
                  className={`wi ${
                    iconMapping[weatherData.weather[0].icon]
                  }`}
                ></i>
              </div>
              <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                  <span>Temperatura: </span>
                  {Math.floor(weatherData.main.temp - 273.15)}°
                </div>
                <div>
                  <span>Humedad: </span>
                  {weatherData.main.humidity}%
                </div>
                <div>
                  <span>Sensación térmica: </span>
                  {Math.floor(weatherData.main.feels_like - 273.15)}°
                </div>
                <br />
                <div className={styles.weatherCondition}>
                  <span>¿Cómo está el clima? </span> <br />
                  {weatherData.weather[0].description.charAt(0).toUpperCase() +
                    weatherData.weather[0].description.slice(1)}
                </div>
              </div>
            </div>
            <div className={styles.place}>{weatherData.name}</div>
          </>
        ) : (
          <div className={styles.place}>
            <div class="lds-facebook"><div></div><div></div><div></div></div>          </div>
        )}
      </article>
    </main>
  );
}

