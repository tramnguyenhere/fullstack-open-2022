import React from 'react';

const Persons = ({ searchName, persons }) => {
  const regex = new RegExp(searchName, 'i');
  const filteredList = [];

  for (let i = 0; i < persons.length; i++) {
    if (regex.test(persons[i].name)) {
      filteredList.push(persons[i]);
    }
  }
  return filteredList.length === 0
    ? persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))
    : filteredList.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ));
};

export default Persons;
