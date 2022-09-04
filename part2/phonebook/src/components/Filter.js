import React from 'react';

const Filter = ({ value, onChange }) => (
  <div className='filter'>
    filter shown with <input value={value} onChange={onChange} />
  </div>
);

export default Filter;
