//import model of sauce folder and bilt-in module file system fs()  
const Sauce = require('../models/post');
const fileSystem = require('fs');
const Post = require('../models/post');

//Creating post card and save 
exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.post = JSON.parse(req.body.post);
    const post = new Post({
        userId: req.body.post.userId,
        contents: req.body.post.contents,
        imageUrl: url + '/images/' + req.file.filename,
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
                    error: error
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
                error: error
            });
        }
    );
};

//Updating an existed post card
exports.modifyPost = (req, res, next) => {
    let post = new Post({ id: req.params.id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.post = JSON.parse(req.body.post);
        post = {
            id: req.params.id,
            userId: req.body.post.userId,
            contents: req.body.sauce.contents,
            imageUrl: url + '/images/' + req.file.filename,
            usersRead: [],
        };
    } else {
        post = {
            id: req.params.id,
            userId: req.body.userId,
            contents: req.body.contents,
            imageUrl: req.body.imageUrl,
            usersRead: [],
        }
    }
    Post.updateOne({ id: req.params.id }, post).then(
        () => {
            res.status(201).json({
                message: 'Post updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

//Delete a Sauce card
exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id }
    }).then((post) => {
        if (!post) {
            return res.status(404).json({
                error: new Error('No Such a User!')
            });
        }
        if (post.userId !== req.auth.userId) {
            return res.status(403).json({
                error: new Error('Unauthorized request!')
            });
        }
        const filename = post.imageUrl.split('/images/')[1];
        fileSystem.unlink('images/' + filename, () => {
            Post.deleteOne({ id: req.params.id }).then(
                () => {
                    res.status(200).json({
                        message: 'Deleted!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        });
    }
    );
};

// Display all sauce cards
exports.getAllPosts = (req, res, next) => {
    Sauce.find().then((post) => {
        res.status(200).json(post);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// Updating sauce card wiht likes/dislikes status from users
exports.read = (req, res, next) => {
    let readedPost = req.body.readedPost;
    let userId = req.body.userId;
    Post.findOne({ where: {id: req.params.id } }).then(post => {
        if (readedPost === 1) {
            if (!post.usersRead.includes(userId)) {
                post.usersRead.push(userId);

            }
        }
        
        Post.updateOne({ id: req.params.id }, post).then(() => {
            res.status(201).json({ message: 'Post updated successfully.' })
        })
    })
} 
