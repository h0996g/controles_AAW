const mongoose = require('mongoose');

const enseignant = new mongoose.Schema({
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

const Enseignant = mongoose.model('Enseignant', enseignant);

module.exports = Enseignant;