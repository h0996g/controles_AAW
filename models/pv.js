const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const Modulee = require('./module');


const note = new mongoose.Schema({

    math: {
        // type: Number,
        type: ObjectId,
        ref: 'Modulee',
        // default: 0,

        // required: true,
        index: true,

        // unique: true,

    },
    physique: {
        // type: Number,
        type: ObjectId,
        ref: 'Modulee',

        // default: 0,

        // required: true,
        index: true,

        // unique: true,

    },
    algo: {
        // type: Number,
        type: ObjectId,
        ref: 'Modulee',

        // required: true,
        // default: 0,
        index: true,

        // unique: true,

    },
    // moy: {
    //     type: Number,
    //     default: function () {
    //         return (this.algo + this.math + this.physique)
    //     }

    // },
    userowner: {
        type: ObjectId,
        ref: 'Etudient',
        index: true

    },
    // moduleowner: [Modulee]

}, {
    toJSON: { virtuals: true }

});
// note.index({ math: 1, userowner: 1, physique: 1, algo: 1 }, { unique: true })
// note.index({ physique: 1, userowner: 1 }, { unique: true })
// note.index({ algo: 1, userowner: 1 }, { unique: true })
note.virtual("moy").get(function () {
    return (this.math['moy'] + this.algo['moy'] + this.physique['moy']) / 3
})
// note.pre('save', function (next) {
//     this.moy = (this.algo + this.math + this.physique) / 3
//     console.log('save')
//     next();
// });


// note.pre('findOneAndUpdate', async function (next) {

//     data = this.getUpdate();  //!tjib ghir module li dernalo modufier lokhrin yjiw null
//     for (element in data.value) {
//         edite = this.element     //bh nkhabiwh fi variable
//     }

//     const dd = await this.model.findOne(this.getQuery());
//     console.log(dd);
//     // this.moy = (this.algo + this.math + this.physique) / 3
//     // 
//     data.moy = await (data.algo ?? dd.algo + data.math ?? dd.math + data.physique ?? dd.physique) / 3


//     // console.log(data.math)
//     // console.log(data.algo)

// });
const Pv = mongoose.model('Pv', note);

module.exports = Pv;
