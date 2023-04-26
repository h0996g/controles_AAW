// const Reclamation = require('../models/etudient');
const Reclamation = require('../models/reclamation');

const Note = require('../models/note');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId



exports.getUserModule = async (req, res) => {
  try {
    const note = await Note.find({ userowner: ObjectId(req.params.id) });

    res.json(note[0][req.params.module]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReclamation = async (req, res) => {
  try {
    const { text, module, userowner, done } = req.body;
    const reclamation = new Reclamation({ text, module, userowner, done });
    await reclamation.save();
    res.status(201).json(reclamation);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};











exports.getAllUsers = async (req, res) => {
  const users = await Reclamation.find();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Reclamation.findById(req.params.id);
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
