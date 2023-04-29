const Responsable = require('../models/responsable');
const Etudiant = require('../models/etudient');
const Note = require('../models/note');

const UserServices = require('../services/user.service');
const Etudient = require('../models/etudient');
const ResponsableServices = require('../services/responsable.service');
const mongoose = require('mongoose');
const Reclamation = require('../models/reclamation');

const ObjectId = mongoose.Types.ObjectId


exports.getResponsableDetail = async (req, res) => {
    try {
        const responsable = await Responsable.findOne({ _id: ObjectId(req.params.id) });

        res.json(responsable);
    } catch (err) {
        console.log('gggggg')
        res.status(500).json({ error: err.message });
    }
};








exports.getAllNotes = async (req, res) => {
    const notes = await Note.find().populate('userowner');
    res.json(notes);
};
exports.getEtudiantNote = async (req, res) => {
    try {
        const note = await Note.findOne({ userowner: ObjectId(req.params.id) }).populate('userowner');

        res.json(note);
    } catch (err) {
        console.log('gggggg')
        res.status(500).json({ error: err.message });
    }
};

//! ---------  Etudient--------------------
exports.registerEtudient = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, name, phone, image } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`Etudient Name ${email}, Already Registered`)
        }

        const response = await UserServices.registerUser(email, password, name, phone, image);

        let tokenData;
        tokenData = { _id: response._id, email: email };


        const token = await UserServices.generateAccessToken(tokenData, "secret", "1h")
        const { moy, math, physique, algo } = req.body;
        const note = new Note({ moy, userowner: response.id, math, physique, algo });
        await note.save();
        res.json({ status: true, message: 'User registered successfully', token: token, id: response._id });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

// !----------------------------------




//! ---------  Responsable--------------------
exports.registerResponsable = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, name, phone, image } = req.body;
        const duplicate = await ResponsableServices.getResponsableByEmail(email);
        if (duplicate) {
            throw new Error(`Responsable Name ${email}, Already Registered`)
        }

        const response = await ResponsableServices.registerResponsable(email, password, name, phone, image);

        let tokenData;
        tokenData = { _id: response._id, email: email };


        const token = await ResponsableServices.generateAccessToken(tokenData, "secret", "1h")


        res.json({ status: true, message: 'Responsable registered successfully', token: token, id: response._id });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
exports.loginResponsable = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let responsable = await ResponsableServices.checkResponsable(email);
        if (!responsable) {
            throw new Error('Responsable does not exist');
        }

        const isPasswordCorrect = await responsable.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Responsable Name or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: responsable._id, email: responsable.email };


        const token = await ResponsableServices.generateAccessToken(tokenData, "secret", "1h")

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.updateResponsable = async (req, res) => {
    try {
        const { name, email, image } = req.body;
        const responsable = await Responsable.findByIdAndUpdate(req.params.id, { name, email, image }, { new: true });
        if (!responsable) {
            res.status(404).json({ error: 'Responsable not found' });
        } else {
            res.json(responsable);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// !----------------------------------

exports.getAllReclamation = async (req, res) => {
    const reclamation = await Reclamation.find().populate('userowner');
    res.json(reclamation);
};

exports.updateReclamation = async (req, res) => {
    try {

        const { done } = req.body;

        const reclamation = await Reclamation.findByIdAndUpdate((req.params.id), { done }, { new: true });
        res.json(reclamation);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteReclamation = async (req, res) => {
    try {
        const deletedReclamation = await Reclamation.findByIdAndDelete(req.params.id);
        if (!deletedReclamation) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(deletedReclamation);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}





// exports.createUser = async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const user = new User({ name, email });
//         await user.save();
//         const { moy, math, physique, algo } = req.body;
//         const note = new Note({ moy, userowner: user.id, math, physique, algo });
//         await note.save();
//         res.status(201).json(user);

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

exports.updateUser = async (req, res) => {
    try {
        const { name, email, image } = req.body;
        const user = await Etudient.findByIdAndUpdate(req.params.id, { name, email, image }, { new: true });
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
        const deletedUser = await Etudiant.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(deletedUser);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};