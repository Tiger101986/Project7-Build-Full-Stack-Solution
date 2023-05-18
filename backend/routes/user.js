const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

/**
 * signup router
 * login router 
 * delete router
 */
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.delete('/:id', auth, userController.deleteAccount); 

module.exports = router;