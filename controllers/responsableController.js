const Responsable = require('../models/responsable');
// const User = require('../models/etudient');
const Note = require('../models/note');

const UserServices = require('../services/user.service');
const Etudient = require('../models/etudient');


exports.getAllNotes = async (req, res) => {
    const notes = await Note.find().populate('userowner');
    res.json(notes);
};


//! ---------  user
exports.registerEtudient = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, name, phone, image } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`)
        }

        const response = await UserServices.registerUser(email, password, name, phone, image);

        let tokenData;
        tokenData = { _id: response._id, email: email };


        const token = await UserServices.generateAccessToken(tokenData, "secret", "1h")
        res.json({ status: true, message: 'User registered successfully', token: token, id: response._id });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

// !----------------------------------



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