import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    console.log('effect');
    personServices.getAll().then((allPersons) => {
      console.log('promise fulfilled');
      setPersons(allPersons);
    });
  }, []);
  console.log('render', persons.length, 'persons');

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
      personServices
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => console.log('err', err));
    }
  };

  const deletePerson = (id) => {
    const removedPerson = persons.filter((person) => person.id === id);
    const removedPersonName = removedPerson[0].name;
    const removedPersonId = removedPerson[0].id;
    if (window.confirm(`Delete ${removedPersonName} ?`)) {
      personServices.remove(removedPersonId);
      console.log(`${removedPersonName} is successfully deleted from the list`);
      setPersons(persons.filter((person) => person.id !== removedPersonId));
    }
  };

  const addNewName = (e) => {
    setNewName(e.target.value);
  };
  const addNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

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
      <ul>
        <Persons
          searchName={searchName}
          persons={persons}
          deletePerson={deletePerson}
        />
      </ul>
    </div>
  );
};

export default App;
