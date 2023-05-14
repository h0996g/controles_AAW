const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
// const ObjectSub = mongoose.Types.s
const Pv = require('./pv');


const moduleSchema = new mongoose.Schema({
    module: {
        type: String,
        enum: ['math', 'algo', 'physique'],
        index: true,
    },

    intero: {
        type: Number,
        default: 0,
        index: true,
    },
    controle: {
        type: Number,
        default: 0,
        index: true,
    },
    comment: {
        type: String,
        // default: 0,
        index: true,

    },

    userowner: {
        type: ObjectId,
        ref: 'Etudient',
        index: true

    },

}, {
    toJSON: { virtuals: true }

});


moduleSchema.virtual("moy").get(function () {

    return (this.intero + this.controle * 2) / 3
})
// moduleSchema.index({ module: 1, userowner: 1 }, { unique: true })


const Modulee = mongoose.model('Modulee', moduleSchema);


module.exports = Modulee;
