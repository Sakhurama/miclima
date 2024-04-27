"use client";
import { useEffect, useState } from "react";
import styles from './page.module.css'

function getCurrentDate () {
  return "la monda manin";
}

export default function Home() {
  const date = getCurrentDate ();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Colombia");

  async function fetchData(cityName:string) {  
    try {
      const response = await fetch("http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } 
    
    catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData("londres");
  }, []);

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        {weatherData && weatherData.weather && weatherData.weather[0] ?(
          <>
          <div className={styles.icon_and_weatherInfo}>
            <div className={styles.weatherIcon}>
              <i className="wi wi-day-cloudy"></i>
            </div>

            <div className={styles.weatherInfo}>
              <div>
                <span>
                <span>Temperatura: </span>
                  {weatherData?.main?.temp}
                </span>
              </div>
              <div>
                  <span>Sensación termica: </span>
                  {weatherData?.main?.feels_like}
              </div>
              <div>
                <span>¿Cómo está el clima? </span>
                {weatherData?.weather[0]?.description?.toUpperCase()}
              </div>
              <div>{weatherData?.name}</div>
              <div>{date}</div>
            </div>
          </div>
          
          </>
        ): (
          <div className={styles.place}>Cargando...</div>
        )}
      </article>
    </main>
  );
}
