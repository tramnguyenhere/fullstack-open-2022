const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
const Person = require('./models/person.js');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
);

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

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.send(`<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>
    </div>
 `);
    })
    .catch((error) => {
      next(error);
    });

  //   response.send(`<div>
  //         <p>Phonebook has info for ${length} people</p>
  //         <p>${new Date().toString()}</p>
  //     </div>
  //  `);
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/api/persons', (request, response, next) => {
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
      .catch((error) => {
        next(error);
      });
  }
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

morgan.token('post-data', (request) => {
  if (request.method == 'POST') return JSON.stringify(request.body);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on post ${PORT}`);
});
