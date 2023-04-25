const mongoose = require('mongoose');

const etudioneSchema = new mongoose.Schema({
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

const Etudient = mongoose.model('Etudient', etudioneSchema);

module.exports = Etudient;
