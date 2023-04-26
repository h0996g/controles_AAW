const express = require('express');
const router = express.Router();
const userController = require('../controllers/etudientController');
const enseignantController = require('../controllers/enseignantController');
const responsableController = require('../controllers/responsableController');
const noteController = require('../controllers/noteController');

// Get all users
router.get('/users', userController.getAllUsers);
router.get('/notes', noteController.getAllNotes);
router.get('/ensignant', enseignantController.getAllEnsignant);

// Get user by ID
// router.get('/users/:id', userController.getUserById);
router.get('/users/:id/:module', userController.getUserModule);

// Create new user
router.post('/addUser', responsableController.createUser);
router.post('/addnote', enseignantController.createNote);
router.post('/ensignant', enseignantController.createEnsignant);


// Update user
router.put('/updateUser/:id', responsableController.updateUser);
router.put('/users/:id/:module', enseignantController.updateNote);

// Delete user
router.delete('/deleteUser/:id', responsableController.deleteUser);

module.exports = router;
