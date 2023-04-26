const Enseignant = require('../models/enseignant');
const Note = require('../models/note');
const mongoose = require('mongoose');
const Reclamation = require('../models/reclamation');

const ObjectId = mongoose.Types.ObjectId


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

exports.consultReclamationModule = async (req, res) => {
    try {
        const reclamation = await Reclamation.find({ module: req.params.module });

        res.json(reclamation);
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

