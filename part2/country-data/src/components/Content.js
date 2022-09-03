import React from 'react';

const Content = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (
    (countries.length > 1 && countries.length < 10) ||
    countries.length === 0
  ) {
    return (
      <>
        <ul>
          {countries.map((item, i) => {
            return <li key={i}>{item.name.common}</li>;
          })}
        </ul>
      </>
    );
  } else {
    return (
      <>
        {countries.map((item, i) => {
          return (
            <div key={i}>
              <h1>{item.name.common}</h1>
              <p>capital {item.capital}</p>
              <p>area {item.area}</p>

              <h3>languages:</h3>
              <ul>
                {Object.values(item.languages).map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
              <img src={item.flags.png} alt={item.name.common}></img>
            </div>
          );
        })}
      </>
    );
  }
};

export default Content;
