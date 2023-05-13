//Create user model table in email and password attributes or feild for user signup and login
const sequelize = require('./sequelize-cofig');
const { DataTypes } = require('sequelize');

const Post = sequelize.define("Post", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contents:{
        type: DataTypes.STRING,
        allowNull: false    
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    read:
    {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    reader:
    {
        type:DataTypes.ARRAY,
        allowNull: false
    },
    tableName: "Post",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    paranoid: true // tp delete user account
});

module.exports = Post;