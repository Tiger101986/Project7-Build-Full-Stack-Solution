const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postControllers = require('../controllers/post');

// Create Post router with .post() method
router.post('/', auth, multer, postControllers.createPost);

// Retrieving a Specific Post - Single Post router with .get() methods
router.get('/:id', auth, postControllers.getOnePost);

//Update an existing Post router with .put()methods
router.put('/:id', auth, multer, postControllers.modifyPost);

//Delete Post router with .delete() methods
router.delete('/:id', auth, postControllers.deletePost);

// Retrieving a list of Post - Array sauces router with get() method
router.get('/', auth, postControllers.getAllPosts);

//Users read status router 
router.post('/:id/read', auth, postControllers.read);

//export router
module.exports = router;