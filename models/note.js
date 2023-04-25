const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const note = new mongoose.Schema({
    notee: {
        type: String,
        required: true,
    },
    module: {
        type: String,
        required: true,
        unique: true,
    },
    userowner: {
        type: ObjectId,
        ref: 'Etudient'
    }
});

const Note = mongoose.model('Note', note);

module.exports = Note;
