const Enseignant = require('../models/enseignant');
const Note = require('../models/note');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId



exports.updateNote = async (req, res) => {
    var c;
    try {
        if (req.params.module == 'physique') {
            const { physique, } = req.body;
            c = { physique }

        } else if (req.params.module == 'math') {
            const { math, } = req.body;
            c = { math }
        } else if (req.params.module == 'algo') {
            const { algo, } = req.body;
            c = { algo }
        }

        const note = await Note.findOneAndUpdate({ userowner: ObjectId(req.params.id) }, c, { new: true });
        res.json(note);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




















exports.createEnsignant = async (req, res) => {
    try {
        const { name, module } = req.body;
        const enseignant = new Enseignant({ name, module });
        await enseignant.save();
        res.status(201).json(enseignant);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllEnsignant = async (req, res) => {
    const enseignant = await Enseignant.find();
    res.json(enseignant);
};

