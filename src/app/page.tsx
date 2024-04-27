"use client";
import { useEffect, useState } from "react";
import styles from './page.module.css'

function getCurrentDate () {

}

export default function Home() {
  const date = getCurrentDate ();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Colombia");

  async function fetchData(cityName:string) {  
    try {
      const response = await fetch("http://localhost:3000/api/weather?address=" + cityName);
      const jsonData = (await response.json()).data;
    } 
    
    catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData("Colombia");
  }, []);

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        <h1>{weatherData?.name}</h1>
      </article>
    </main>
  );
}
