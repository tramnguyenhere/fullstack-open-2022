import React from 'react';
import Part from './Part';
const Content = ({ parts }) =>
  parts.map((part) => {
    return <Part key={part.id} part={part.name} exercises={part.exercises} />;
  });

export default Content;
