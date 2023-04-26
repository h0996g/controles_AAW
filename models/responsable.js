const mongoose = require('mongoose');

const responsable = new mongoose.Schema({
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

const Responsable = mongoose.model('Responsable', responsable);

module.exports = Responsable;
