"use client";
import { useEffect, useState } from "react";
import styles from "./styles/page.module.css";
import ContactForm from './components/ContactForm';

// Definimos una interfaz para los datos del clima
interface WeatherData {
  weather: { icon: string; description: string }[];
  main: { temp: number; humidity: number; feels_like: number };
  name: string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Inicializamos con null
  const [city, setCity] = useState("Colombia");
  const [showPopup, setShowPopup] = useState(false);

  const iconMapping: { [key: string]: string } = {
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

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  async function fetchData(cityName: string) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=es`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error fetching the weather data');
      }

      const jsonData = await response.json();
      setWeatherData(jsonData); // Actualizamos el estado con los datos del clima
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        <form className={styles.weatherLocation}
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}
        >
          <input
            className={styles.input_field}
            type="text"
            placeholder="Escriba una ciudad..."
            id="cityName"
            name="cityName"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className={styles.searchbtn} type="submit">
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor" /></svg>
          </button>
        </form>

        {weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                <i
                  className={`wi ${iconMapping[weatherData.weather[0].icon]}`}
                ></i>
                <div className={styles.weatherDescription}>
                  {weatherData.weather[0].description.charAt(0).toUpperCase() +
                    weatherData.weather[0].description.slice(1)}
                </div>
              </div>

              {/* Parámetros del clima */}
              <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                  {Math.floor(weatherData.main.temp - 273.15)}°
                </div>

                <div className={styles.weatherStatus}>
                  <div>
                    <span>Humedad: </span>
                    {weatherData.main.humidity}%
                  </div>
                  <div>
                    <span>Sensación térmica: </span>
                    {Math.floor(weatherData.main.feels_like - 273.15)}°
                  </div>
                </div>
                <br />
              </div>
            </div>

            <div className={styles.place}>{weatherData.name}</div>
            <div className={styles.containerForm}>
              {/* Botón para abrir el pop-up */}
              <button className={styles.contactbtn} onClick={() => setShowPopup(true)}>
                ¿Te gustaría recibir actualizaciones del clima?
              </button>

              {/* Pop-up con el formulario de contacto */}
              {showPopup && (
                <div className={styles.popup}>
                  <div className={styles.popupContent}>
                    <button className={styles.closeBtn} onClick={() => setShowPopup(false)}>
                      Cerrar
                    </button>
                    <ContactForm />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.bienvenida}>
            <p>¡BIENVENIDO!</p>
            <span>Consulte el clima de cualquier ciudad</span>
          </div>
        )}
      </article>
    </main>
  );
}
