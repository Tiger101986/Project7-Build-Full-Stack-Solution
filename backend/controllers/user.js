//import bcrypt, jsonwebtoken, and user models
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

// signup with email and password(hash) 
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        })

        user.save().then(() => {
            res.status(201).json({ message: 'User added successfully!' });
        }).catch(
            (error) => {
                res.status(500).json({ error: error.message || error });
            }
        );
    })
}

//loging wiht email and password(bcryt.compare(inputpassword, saveduserpassword))
exports.logIn = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: "User not found!"
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: "Incorrect password!"
                        });
                    }
                    const token = jsonwebtoken.sign(
                        { userId: user.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    res.status(200).json({
                        userId: user.id,
                        email: user.email,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error.message || error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error.message || error
            });
        }
    );
}

//Diplay all users without password
exports.getAllUsers = (req, res, next) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        order: [["createdAt", "DESC"]]
    }).then((user) => {
        res.status(200).json(user);
    }).catch(
        (error) => {
            res.status(400).json({ error: error.message || error });
        }
    )
}

//Delete User Account
exports.deleteAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.userId } }).then(
        (user) => {
            if (!user) {
                return res.status(404).json({
                    error: 'Only user is authorized to delete account!'
                });
            }
            if (user.id !== req.auth.userId) {
                return res.status(403).json({
                    error: 'Unauthorized request!'
                });
            }
            User.destroy({ where: { id: req.params.userId } })
                .then(() => {
                    res.status(200).json({ message: ' User Account Delected Successfully!' });
                }
                ).catch((error) => {
                    res.status(400).json({ error: error.message || error });
                }
                );
        }
    );
};
