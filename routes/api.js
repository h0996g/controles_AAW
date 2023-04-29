const express = require('express');
const router = express.Router();
const userController = require('../controllers/etudientController');
const enseignantController = require('../controllers/enseignantController');
const responsableController = require('../controllers/responsableController');
const noteController = require('../controllers/noteController');
const reclamationController = require('../controllers/reclamationController');


router.post("/registerEtudient", responsableController.registerEtudient);
router.post("/loginEtudient", userController.loginEtudient);

router.post("/registerEnseignant", enseignantController.registerEnseignant);
router.post("/loginEnseignant", enseignantController.loginEnseignant);

router.post("/loginResponsable", responsableController.loginResponsable);
router.post("/registerResponsable", responsableController.registerResponsable);





// Get all users
router.get('/AllEtudiants', userController.getAllUsers);
router.get('/AllReclamation', responsableController.getAllReclamation);
router.get('/allNotes', responsableController.getAllNotes);
router.get('/ensignant', enseignantController.getAllEnsignant);
router.get('/consultReclamationModule/:module', enseignantController.consultReclamationModule);

// Get user by ID
// router.get('/users/:id', userController.getUserById);
router.get('/users/:id/:module', userController.getUserModule);
router.get('/getEtudiantInfo/:id', responsableController.getEtudiantNote);
router.get('/GETRESPONSABLEDETAIL/:id', responsableController.getResponsableDetail);

// Create new user
// router.post('/addUser', responsableController.createUser);
// ! raditha fl update tol 
// router.post('/addnote', enseignantController.createNote);

router.post('/ensignant', enseignantController.createEnsignant);
router.post('/addReclamation', userController.createReclamation);


// Update user
router.put('/updateResponsable/:id', responsableController.updateResponsable);
router.put('/updateUser/:id', responsableController.updateUser);
router.put('/updateEtudiantWtithResponsable/:id', enseignantController.updateNote);  //!na7it module fl path drto ynzad fl body
router.put('/updateReclamation/:id', responsableController.updateReclamation);  //!na7it module fl path drto ynzad fl body

// Delete user
router.delete('/deleteEtudiant/:id', responsableController.deleteUser);
router.delete('/deleteReclamation/:id', responsableController.deleteReclamation);

module.exports = router;
