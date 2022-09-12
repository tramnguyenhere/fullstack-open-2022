const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

console.log('connected to', url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => console.log('error connecting to MongoDB', error.message));

const personSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (val) {
        return /^(\d{2,3}-)\d+/.test(val);
      },
      message: 'This is not a valid phone number!',
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
