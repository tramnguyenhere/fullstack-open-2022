import React from 'react';

const Persons = ({ searchName, persons, deletePerson }) => {
  const regex = new RegExp(searchName, 'i');
  const filteredList = [];

  for (let i = 0; i < persons.length; i++) {
    if (regex.test(persons[i].name)) {
      filteredList.push(persons[i]);
    }
  }
  return filteredList.length === 0
    ? persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{' '}
          <button key={person.id} onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </li>
      ))
    : filteredList.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button key={person.id} onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </li>
      ));
};

export default Persons;
