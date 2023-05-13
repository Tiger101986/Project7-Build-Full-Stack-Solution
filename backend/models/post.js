//Create Post model table 
const sequelize = require('./sequelize-cofig');
const { DataTypes } = require('sequelize');

const Post = sequelize.define("Post", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
       
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
    readedPost: {type:DataTypes.INTEGER},
    userRead:
    {
        type:DataTypes.ARRAY(DataTypes.STRING),
    },
    tableName: "Post",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    paranoid: true // delete user post
});

module.exports = Post;