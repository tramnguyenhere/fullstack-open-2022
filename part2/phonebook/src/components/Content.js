import React from 'react';
import Person from './Person';
import '../styles.css';

const Content = ({ persons, allPersons, deletePerson }) => {
  console.log(persons.length);
  if (persons.length === 0) {
    return (
      <ul className='name__list'>
        {allPersons.map((person, i) => (
          <Person key={i} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    );
  } else {
    return (
      <ul className='name__list'>
        {persons.map((person, i) => (
          <Person key={i} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    );
  }
};

export default Content;
