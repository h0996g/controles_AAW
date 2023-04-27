const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const enseignantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    module: {
        type: String,
        required: true,
        // unique: true,
    }, email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }, phone: {
        type: String,
        // required: true,
    }, image: {
        type: String,
        required: false
    }

});

enseignantSchema.pre("save", async function () {
    var enseignant = this;
    if (!enseignant.isModified("password")) {
        return
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(enseignant.password, salt);

        enseignant.password = hash;
    } catch (err) {
        throw err;
    }
});


//used while signIn decrypt
enseignantSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log('----------------no password', this.password);
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


const Enseignant = mongoose.model('Enseignant', enseignantSchema);

module.exports = Enseignant;
