const express = require('express');
const router = express.Router();
const userController = require('../controllers/etudientController');
const enseignantController = require('../controllers/enseignantController');
const responsableController = require('../controllers/responsableController');
// const pvController = require('../controllers/pvController');
// const reclamationController = require('../controllers/reclamationController');

//! li rahom bl 7mar mzlt mabedelthomh 


router.post("/studients", responsableController.createStudent);
router.post("/loginEtudiant", userController.loginEtudient);  //!

router.post("/teachers", enseignantController.createTeacher);
router.post("/loginEnseignant", enseignantController.loginEnseignant); //!

router.post("/loginResponsable", responsableController.loginResponsable); //!
router.post("/responsibles", responsableController.createResponsible);





// Get all users
router.get('/students', userController.getAllStudent);
router.get('/reclamations', responsableController.getAllReclamation);
router.get('/reclamations/:id', userController.getOwnEtudiantReclamation);

router.get('/pvs', responsableController.getAllPv);
router.get('/ensignant', enseignantController.getAllEnsignant);
router.get('/consultReclamationModule/:module', enseignantController.consultReclamationModule);

// Get user by ID
// router.get('/users/:id', userController.getUserById);
router.get('/modules/:module/:id', userController.getUserModule);
router.get('/pvs/:id', responsableController.getEtudiantNote);
router.get('/responsibles/:id', responsableController.getResponsableDetail);

// Create new user
// router.post('/addUser', responsableController.createUser);
// ! raditha fl update tol 
// router.post('/addnote', enseignantController.createNote);

router.post('/ensignant', enseignantController.createEnsignant);
router.post('/reclamations', userController.createReclamation);


// Update user
router.put('/responsibles/:id', responsableController.updateResponsible);
router.put('/students/:id', responsableController.updateStudent);
router.put('/modules/:id/:module', enseignantController.updateModule);  //!na7it module fl path drto ynzad fl body
router.put('/reclamations/:id', responsableController.updateReclamation);  //!na7it module fl path drto ynzad fl body

// Delete user
router.delete('/students/:id', responsableController.deleteUser);
router.delete('/reclamations/:id', responsableController.deleteReclamation);

module.exports = router;
