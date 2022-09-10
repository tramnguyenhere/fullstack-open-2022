const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_URI;
console.log('connected to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => console.log('error connecting to MongoDB', error.message));

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
