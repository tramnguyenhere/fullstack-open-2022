import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const listExistingName = [];
    persons.map((person) => listExistingName.push(person.name));
    if (listExistingName.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }
    setNewName('');
    setNewNumber('');
  };

  const addNewName = (e) => {
    setNewName(e.target.value);
  };
  const addNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  //Handle filter searchName

  const handleFilter = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} searchName={searchName} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        addNewName={addNewName}
        addNewNumber={addNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons searchName={searchName} persons={persons} />
    </div>
  );
};

export default App;
