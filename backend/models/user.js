//Create user model table in email and password attributes or feild for user signup and login
const sequelize = require('./sequelize-cofig');
const { DataTypes } = require('sequelize');

const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false
    }
}, {
    tableName: "User",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    paranoid: true // tp delete user account
});

module.exports = User;