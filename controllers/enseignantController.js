const Enseignant = require('../models/enseignant');
const Note = require('../models/note');
const mongoose = require('mongoose');
const Reclamation = require('../models/reclamation');
// const EnseignantServices = require('../services/enseignant.service');
const EnseignantServices = require('../services/enseignant.service');
const { response } = require('express');


const ObjectId = mongoose.Types.ObjectId




exports.loginEnseignant = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let enseignant = await EnseignantServices.checkEnseignant(email);
        if (!enseignant) {
            throw new Error('Enseignant does not exist');
        }

        const isPasswordCorrect = await enseignant.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Enseignant Name or Password does not match`);
        }



        let tokenData;
        tokenData = { _id: enseignant._id, email: enseignant.email, module: enseignant.module };


        const token = await EnseignantServices.generateAccessToken(tokenData, "secret", "1h")

        res.status(200).json({
            status: true, success: "sendData", token: token,
            module: enseignant.module
        });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}



exports.registerEnseignant = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, name, phone, image, module } = req.body;
        const duplicate = await EnseignantServices.getEnseignantByEmail(email);
        if (duplicate) {
            throw new Error(`Enseignant Name ${email}, Already Registered`)
        }

        const response = await EnseignantServices.registerEnseignant(email, password, name, phone, image, module);

        let tokenData;
        tokenData = { _id: response._id, email: email, module: response.module };


        const token = await EnseignantServices.generateAccessToken(tokenData, "secret", "1h")
        res.json({ status: true, message: 'Enseignant registered successfully', token: token, id: response._id, module: response.module });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}











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
    // var c;
    try {
        // if (req.params.module == 'physique') {
        //     const { physique, } = req.body;
        //     c = { physique }

        // } else if (req.params.module == 'math') {
        //     const { math, } = req.body;
        //     c = { math }
        // } else if (req.params.module == 'algo') {
        //     const { algo, } = req.body;
        //     c = { algo }
        // }
        const { math, physique, algo } = req.body;

        const note = await Note.findOneAndUpdate({ userowner: ObjectId(req.params.id) }, { math, physique, algo }, { new: true });
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

