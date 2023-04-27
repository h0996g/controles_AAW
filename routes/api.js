const express = require('express');
const router = express.Router();
const userController = require('../controllers/etudientController');
const enseignantController = require('../controllers/enseignantController');
const responsableController = require('../controllers/responsableController');
const noteController = require('../controllers/noteController');
const reclamationController = require('../controllers/reclamationController');


router.post("/registerEtudient", responsableController.registerEtudient);

router.post("/loginEtudient", userController.loginEtudient);





// Get all users
router.get('/users', userController.getAllUsers);
router.get('/allNotes', responsableController.getAllNotes);
router.get('/ensignant', enseignantController.getAllEnsignant);
router.get('/consultReclamationModule/:module', enseignantController.consultReclamationModule);

// Get user by ID
// router.get('/users/:id', userController.getUserById);
router.get('/users/:id/:module', userController.getUserModule);

// Create new user
// router.post('/addUser', responsableController.createUser);
// ! raditha fl update tol 
// router.post('/addnote', enseignantController.createNote);

router.post('/ensignant', enseignantController.createEnsignant);
router.post('/addReclamation', userController.createReclamation);


// Update user
router.put('/updateUser/:id', responsableController.updateUser);
router.put('/users/:id/:module', enseignantController.updateNote);

// Delete user
router.delete('/deleteUser/:id', responsableController.deleteUser);

module.exports = router;
