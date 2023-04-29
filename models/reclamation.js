const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId




const reclamation = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
        index: true

    },
    text: {
        type: String,
        // required: true,
        index: true

    },
    module: {
        type: String,
        required: true,
        // unique: true,
        index: true

    },
    userowner: {
        type: ObjectId,
        ref: 'Etudient',
        index: true

    },
    done: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
reclamation.index({ text: 1, userowner: 1, module: 1, title: 1 }, { unique: true })


const Reclamation = mongoose.model('Reclamation', reclamation);

module.exports = Reclamation;
