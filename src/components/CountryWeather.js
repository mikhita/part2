import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosRateLimit from "axios-rate-limit";

const apiKey = "c1eff508624b66bb7ced5db5345ba01b";
const rateLimitedAxios = AxiosRateLimit(axios.create(), {
  maxRequests: 60,
  perMilliseconds: 1000 * 60,
  maxRPS: 1,
});

function CountryWeather({ name }) {
  const [capitalCity, setCapitalCity] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await rateLimitedAxios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = response.data;
      if (data.length === 1) {
        setCapitalCity(data[0].capital);
        if (capitalCity) {
          const weatherResponse = await rateLimitedAxios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKey}`
          );
          const weatherData = weatherResponse.data;
          setWeather(weatherData);
        }
      }
    };

    fetchData();
  }, [name, capitalCity]);

  return (
    <div>
      {weather.main ? (
        <div>
          <p>Temperature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p>
          <p>Pressure: {weather.main.pressure}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountryWeather;
