const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postControllers = require('../controllers/post');

// Create Post router with .post() method
router.post('/', auth, multer, postControllers.createPost);

// Retrieving a Specific Post - Single Post router with .get() methods
router.get('/:id', auth, postControllers.getOnePost);

//Retrieving a list of post for a user
router.get('/userId/:userId', auth, postControllers.getAllPostsForUser);

// Retrieving a list of Post - Array of posts router with get() method
router.get('/', auth, postControllers.getAllPosts);

//Users read status router 
router.post('/:id/read', auth, postControllers.read);

//export router
module.exports = router;