const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
const Person = require('./models/person.js');

app.use(express.json());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
);
app.use(cors());
app.use(express.static('build'));

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  response.send(`<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>
    </div>
 `);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id == id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  // const isNotUnique = persons.find((person) => person.name === body.name);
  if (!body.name) {
    return response.status(400).json({ error: 'name must be missing' });
  } else if (!body.number) {
    return response.status(400).json({ error: 'number must be missing' });
  }
  // else if ( isNotUnique )
  // {
  //   return response.status(400).json({ error: 'name must be unique' });
  // }
  else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((err) => console.log('error: ', err));
  }
});

morgan.token('post-data', (request, response) => {
  if (request.method == 'POST') return JSON.stringify(request.body);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on post ${PORT}`);
});
