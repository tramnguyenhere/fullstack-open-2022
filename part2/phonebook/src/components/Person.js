import React from 'react';
import '../styles.css';

const Person = ({ person, deletePerson }) => (
  <li className='name__item'>
    {person.name} {person.number}{' '}
    <button onClick={() => deletePerson(person.id)}>delete</button>
  </li>
);

export default Person;
