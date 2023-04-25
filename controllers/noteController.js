const Note = require('../models/note');

exports.createNote = async (req, res) => {
    try {
        const { moy, math, physique, algo, userowner } = req.body;
        const note = new Note({ moy, userowner, math, physique, algo });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllNotes = async (req, res) => {
    const notes = await Note.find().populate('userowner');
    res.json(notes);
};