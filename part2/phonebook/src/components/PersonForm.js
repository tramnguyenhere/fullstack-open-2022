import React from 'react';
import '../styles.css';
const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={onSubmit} className='form'>
    <div className='name--add'>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div className='number--add'>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default PersonForm;
