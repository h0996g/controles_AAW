const Note = require('../models/note');

exports.createNote = async (req, res) => {
    try {
        const { notee, module, userowner } = req.body;
        const note = new Note({ notee, module, userowner });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};