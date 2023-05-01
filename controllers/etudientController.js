// const Reclamation = require('../models/etudient');
const Reclamation = require('../models/reclamation');
const UserServices = require('../services/user.service');


const Note = require('../models/note');
const Etudient = require('../models/etudient');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId


exports.loginEtudient = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Parameter are not correct');
    }
    let user = await UserServices.checkUser(email);
    if (!user) {
      throw new Error('User does not exist');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (isPasswordCorrect === false) {
      throw new Error(`Username or Password does not match`);
    }

    // Creating Token

    let tokenData;
    tokenData = { _id: user._id, email: user.email };


    const token = await UserServices.generateAccessToken(tokenData, "secret", "1h")

    res.status(200).json({ status: true, success: "sendData", token: token });
  } catch (error) {
    console.log(error, 'err---->');
    next(error);
  }
}







exports.getOwnEtudiantReclamation = async (req, res) => {
  const reclamationById = await Reclamation.find({ userowner: ObjectId(req.params.id) }).populate('userowner');
  res.json(reclamationById);
};







exports.getUserModule = async (req, res) => {
  try {
    const note = await Note.find({ userowner: ObjectId(req.params.id), module: req.params.module });

    res.json(note[0][req.params.module]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReclamation = async (req, res) => {
  try {
    const { text, module, userowner, done, title } = req.body;
    const reclamation = new Reclamation({ text, module, userowner, done, title });
    await reclamation.save();
    res.status(201).json(reclamation);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};











exports.getAllUsers = async (req, res) => {
  const users = await Etudient.find();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Etudient.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const user = new User({ name, email });
//     await user.save();
//     const { moy, math, physique, algo } = req.body;
//     const note = new Note({ moy, userowner: user.id, math, physique, algo });
//     await note.save();
//     res.status(201).json(user);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
//     if (!user) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       res.json(user);
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       res.json(deletedUser);
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
