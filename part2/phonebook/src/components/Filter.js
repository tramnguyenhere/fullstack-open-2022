import React from 'react';

const Filter = ({ handleFilter, searchName }) => {
  return (
    <p>
      filter shown with
      <input type='text' onChange={handleFilter} value={searchName} />
    </p>
  );
};

export default Filter;
