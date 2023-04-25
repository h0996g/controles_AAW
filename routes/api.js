const express = require('express');
const router = express.Router();
const userController = require('../controllers/etudientController');
const enseignantController = require('../controllers/enseignantController');
const responsableController = require('../controllers/responsableController');
const noteController = require('../controllers/noteController');

// Get all users
router.get('/users', userController.getAllUsers);
router.get('/notes', noteController.getAllNotes);

// Get user by ID
router.get('/users/:id', userController.getUserById);

// Create new user
router.post('/users', userController.createUser);
router.post('/note', noteController.createNote);

// Update user
router.put('/users/:id', userController.updateUser);

// Delete user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;