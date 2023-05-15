//Create Post model table 
const sequelize = require('./sequelize-cofig');
const { DataTypes } = require('sequelize');

const Post = sequelize.define("Post", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false   
    },
    contents:{
        type: DataTypes.STRING(512),
        allowNull: false    
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true   
    },
    usersRead:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
    }    
},{
    tableName: "Post",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    paranoid: true // delete user post
});

module.exports = Post;