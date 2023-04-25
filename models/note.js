const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const note = new mongoose.Schema({

    math: {
        type: Number,
        default: 0,

        // required: true,
        index: true,

        // unique: true,

    },
    physique: {
        type: Number,
        default: 0,

        // required: true,
        index: true,

        // unique: true,

    },
    algo: {
        type: Number,
        // required: true,
        default: 0,
        index: true,

        // unique: true,

    },
    moy: {
        type: Number,

    },
    userowner: {
        type: ObjectId,
        ref: 'Etudient',
        index: true

    },

});
// note.index({ math: 1, userowner: 1, physique: 1, algo: 1 }, { unique: true })
// note.index({ physique: 1, userowner: 1 }, { unique: true })
// note.index({ algo: 1, userowner: 1 }, { unique: true })

note.pre('save', function (next) {
    this.moy = (this.algo + this.math + this.physique) / 3
    next();
});
const Note = mongoose.model('Note', note);

module.exports = Note;
