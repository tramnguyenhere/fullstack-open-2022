import React from 'react';

const Country = ({ countries }) => {
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
    </div>
  );
};

export default Country;
