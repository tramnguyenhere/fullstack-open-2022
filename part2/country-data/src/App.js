import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import axios from 'axios';
import Content from './components/Content';
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const regex = new RegExp(searchTerm, 'i');
    const list = allCountries.filter(
      (item) => regex.test(item.name.common) || regex.test(item.name.official)
    );
    setCountries(list);
  };
  console.log(countries);

  useEffect(() => {
    console.log('effect');
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      console.log('promise fulfilled');
      console.log(response.data);
      setAllCountries(response.data);
    });
  }, []);

  console.log('render', allCountries.length, 'countries');

  console.log(searchTerm);

  return (
    <>
      <Search handleSearch={handleSearch} searchTerm={searchTerm} />
      <Content countries={countries} />
    </>
  );
};

export default App;
