//import model of sauce folder and bilt-in module file system fs()  
const fileSystem = require('fs');
const Post = require('../models/post');

//Creating post card and save 
exports.createPost = (req, res, next) => {
    let parsePost;
    let imageUrl = null;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imageUrl = url + '/images/' + req.file.filename,
            parsePost = JSON.parse(req.body.post);
    } else {
        parsePost = req.body;
    }

    const post = new Post({
        userId: parsePost.userId,
        contents: parsePost.contents,
        imageUrl: imageUrl,
        usersRead: [],
    });
    post.save()
        .then(() => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        })
        .catch(
            (error) => {
                res.status(400).json({
                    error: error.message || error
                });
            }
        );
};

// Displaying single post card
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    }).then((post) => {
        res.status(200).json(post);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error.message || error
            });
        }
    );
};

// Display all sauce cards
exports.getAllPosts = (req, res, next) => {
    Post.findAll().then((post) => {
        res.status(200).json(post);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error.message || error
            });
        }
    );
}

// Updating post card wiht read post status from users
exports.read = (req, res, next) => {
    let readedPost = req.body.readedPost;
    let userId = req.body.userId;
    Post.findOne({ where: { id: req.params.id } }).then(post => {
        if (readedPost === 1) {
            if (!post.usersRead.includes(userId)) {
                post.usersRead.push(userId);
            }
        }
        Post.update(req.body, { where: { id: req.params.id } }, post).then(() => {
            res.status(201).json({ message: 'Post updated successfully.' })
        }).catch(
            (error) => {
                res.status(400).json({
                    error: error.message || error
                });
            }
        );
    });
} 
