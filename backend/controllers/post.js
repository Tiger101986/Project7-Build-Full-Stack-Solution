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

// Display all posted cards
exports.getAllPosts = (req, res, next) => {
    Post.findAll({ order: [["createdAt", "DESC"]] }).then((post) => {
        res.status(200).json(post);
    }).catch(
        (error) => {
            res.status(400).json({
                error: error.message || error
            });
        }
    );
}

//Display all posts for one user
exports.getAllPostsForUser = (req, res, next) => {
    Post.findAll({
        where: { userId: req.params.userId },
        order: [["createdAt", "DESC"]]
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

// Updating post card wiht read post status from users
exports.read = (req, res, next) => {
    let userId = req.body.userId;
    Post.findOne({ where: { id: req.params.id } }).then(post => {
        let { usersRead } = post;
        if (!usersRead.includes(userId)) {
            usersRead = [...usersRead, userId];
        }

        post.update({ usersRead }).then(() => {
            post.save().then(() => res.status(201).json({ message: 'Post updated successfully.' }))
        }).catch(
            (error) => {
                res.status(400).json({
                    error: error.message || error
                });
            }
        );
    });
} 
