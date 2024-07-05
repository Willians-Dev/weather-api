import React, { useEffect, useState } from "react";
import "./styles.css";

const apiKey = "f2926a2aec3d9bcec868236be5f0c31d";

function Home() {
  const [data, setData] = useState({
    celsius: 11,
    name: "Quito",
    humidity: 83,
    speed: 1.25,
    icon: "04n",
  });
  const [city, setCity] = useState("Quito");

  const fetchWeather = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        setData({
          celsius: res.main.temp,
          name: res.name,
          humidity: res.main.humidity,
          speed: res.wind.speed,
          icon: res.weather[0].icon,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    fetchWeather(city);
  };

  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Nombre de la Ciudad"
            value={city}
            onChange={handleCityChange}
          />
          <button onClick={handleSearchClick}>
            <img src="/Images/search.svg" alt="Logo svg del boton de busqueda" />
          </button>
        </div>
        <div className="winfo">
          <img src={iconUrl} alt="icon" />
          <h1>{Math.round(data.celsius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/Images/water.svg" alt="humidity icon" />
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p>Humedad</p>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.svg" alt="wind icon" />
              <div className="wind">
                <p>{Math.round(data.speed * 10) / 10} m/s</p>
                <p>Viento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
