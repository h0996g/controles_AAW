const Enseignant = require('../models/enseignant');
const Note = require('../models/note');
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

