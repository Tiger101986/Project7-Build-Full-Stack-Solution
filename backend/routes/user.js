const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

/**
 * signup router
 * login router 
 * get all user
 * delete router
 */
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.delete('/:userId', auth, userController.deleteAccount); 
router.get('/:userId', auth, userController.getAllUsers);

module.exports = router;