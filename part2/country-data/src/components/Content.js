import React from 'react';
import Country from './Country';

const Content = ({ countries, setCountries }) => {
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
            return (
              <li key={i}>
                {item.name.common}
                <button onClick={() => setCountries([item])}>show</button>
              </li>
            );
          })}
        </ul>
      </>
    );
  } else {
    return <Country countries={countries[0]} />;
  }
};

export default Content;
