import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ countries }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    console.log('effect');
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countries.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [countries]);
  return (
    <div>
      <h1>{countries.name.common}</h1>
      <p>capital {countries.capital}</p>
      <p>area {countries.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(countries.languages).map((countries) => (
          <li>{countries}</li>
        ))}
      </ul>
      <img src={countries.flags.png} alt={countries.name.common}></img>
      <h2>Weather in {countries.capital}</h2>
      <p>temperature {weather.main && weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${
          weather.weather && weather.weather[0].icon
        }@2x.png`}
        alt={countries.capital}
      />
      <p>wind {weather.wind && weather.wind.speed} m/s</p>
    </div>
  );
};

export default Country;
