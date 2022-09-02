import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import axios from 'axios';
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    console.log('effect');
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      console.log('promise fulfilled');
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  console.log('render', countries.length, 'countries');

  console.log(searchTerm);
  return <Search handleSearch={handleSearch} searchTerm={searchTerm} />;
};

export default App;
