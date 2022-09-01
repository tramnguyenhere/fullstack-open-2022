import { useState } from 'react';

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

  const regex = new RegExp(searchName, 'i');
  const filteredList = [];

  for (let i = 0; i < persons.length; i++) {
    if (regex.test(persons[i].name)) {
      filteredList.push(persons[i]);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with
        <input type='text' onChange={handleFilter} value={searchName} />
      </p>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type='text' onChange={addNewName} value={newName} />
        </div>
        <div>
          number:
          <input type='number' onChange={addNewNumber} value={newNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredList.length === 0
        ? persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : filteredList.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

export default App;
