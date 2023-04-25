const mongoose = require('mongoose');

const etudientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Etudient = mongoose.model('Etudient', etudientSchema);

module.exports = Etudient;
