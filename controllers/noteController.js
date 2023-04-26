const Note = require('../models/note');


exports.getAllNotes = async (req, res) => {
    const notes = await Note.find().populate('userowner');
    res.json(notes);
};