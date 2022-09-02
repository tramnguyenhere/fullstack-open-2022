import React from 'react';

const Search = ({ handleSearch, searchTerm }) => {
  return (
    <div>
      find countries
      <input type='text' onChange={handleSearch} value={searchTerm}></input>
    </div>
  );
};

export default Search;
