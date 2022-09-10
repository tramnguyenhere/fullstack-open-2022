import React, { useState, useEffect } from 'react';
import Content from './components/Content';
import Filter from './components/Filter';
import Message from './components/Message';
import PersonForm from './components/PersonForm';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [allPersons, setAllPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setAllPersons(initialPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const person = allPersons.filter((person) => person.name === newName);
    //const personObject = person[0];
    //const updatedPerson = { ...personObject, number: newNumber };

    if (person.length !== 0) {
      //   if (
      //     window.confirm(
      //       `${personObject.name} is already added to the phonebook, replace the old number with a new one ?`
      //     )
      //   ) {
      //     personService
      //       .update(updatedPerson.id, updatedPerson)
      //       .then((returnedPerson) => {
      //         console.log(`${returnedPerson.name} was successfully updated`);
      //         setAllPersons(
      //           allPersons.map((personItem) =>
      //             personItem.id !== personObject.id ? personItem : returnedPerson
      //           )
      //         );
      //         setNewName('');
      //         setNewNumber('');
      //         setMessage(`${updatedPerson.name} was successfully updated`);
      //         setTimeout(() => {
      //           setMessage(null);
      //         }, 5000);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //         setAllPersons(
      //           allPersons.filter((person) => person.id !== updatedPerson.id)
      //         );
      //         setNewName('');
      //         setNewNumber('');
      //         setMessage(
      //           `Information of ${updatedPerson.name} has already been removed from server`
      //         );
      //         setTimeout(() => {
      //           setMessage(null);
      //         }, 5000);
      //       });
      //   }
      // } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setAllPersons(allPersons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setMessage(`Error: ${error.response.data.error}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          console.log(error.response.data);
        });
    }
  };

  const deletePerson = (id) => {
    const filteredPerson = allPersons.filter((person) => person.id === id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Delete ${personName} ?`)) {
      personService.remove(personId);
      console.log(`${personName} successfully deleted`);
      setMessage(`${personName} was successfully deleted`);
      setAllPersons(allPersons.filter((person) => person.id !== personId));
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    const regex = new RegExp(searchName, 'i');
    const filteredPersons = () =>
      allPersons.filter((person) => regex.test(person.name));
    setPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter value={searchName} onChange={handleFilterChange} />
      <h2>Add new person</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Content
        persons={persons}
        allPersons={allPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
