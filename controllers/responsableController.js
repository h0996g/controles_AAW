const Responsable = require('../models/responsable');
const User = require('../models/etudient');
const Note = require('../models/note');


exports.getAllNotes = async (req, res) => {
    const notes = await Note.find().populate('userowner');
    res.json(notes);
};

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        const { moy, math, physique, algo } = req.body;
        const note = new Note({ moy, userowner: user.id, math, physique, algo });
        await note.save();
        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(deletedUser);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};