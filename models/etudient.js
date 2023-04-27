const mongoose = require('mongoose');
const bcrypt = require("bcrypt");



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
  password: {
    type: String,
    required: [true, "password is required"]
  }, phone: {
    type: String,
    required: true,
  }, image: {
    type: String,
    required: false
  }
}, { timestamps: true });
//!('save')m3natha kima ndir save fi ay blasa kima createUser.save(); tkhdam hadi ldir encrypting 
//  while encrypting user entered password
etudientSchema.pre("save", async function () {
  var user = this;
  if (!user.isModified("password")) {
    return
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (err) {
    throw err;
  }
});


//used while signIn decrypt
etudientSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    console.log('----------------no password', this.password);
    // @ts-ignore
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const Etudient = mongoose.model('Etudient', etudientSchema);

module.exports = Etudient;
