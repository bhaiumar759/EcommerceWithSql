const userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get one user by ID
router.get('/users/:userId', userController.getOneUser);

// Update a user
router.put('/users/:userId', userController.updateUser);

// Delete a user by ID
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;


module.exports = router;
