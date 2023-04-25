const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const enseignantController = require('../controllers/enseignant');
const responsableController = require('../controllers/responsable');

// Get all users
router.get('/users', userController.getAllUsers);

// Get user by ID
router.get('/users/:id', userController.getUserById);

// Create new user
router.post('/users', userController.createUser);

// Update user
router.put('/users/:id', userController.updateUser);

// Delete user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
