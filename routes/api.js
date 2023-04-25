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
router.post('/users', userController.createUser);
router.post('/note', noteController.createNote);
router.post('/ensignant', enseignantController.createEnsignant);


// Update user
router.put('/users/:id', userController.updateUser);

// Delete user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
