import React from 'react';

const PersonForm = ({
  addPerson,
  addNewName,
  addNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input type='text' onChange={addNewName} value={newName} />
      </div>
      <div>
        number:
        <input onChange={addNewNumber} value={newNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
