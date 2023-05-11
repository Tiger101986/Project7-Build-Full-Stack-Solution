/**
 * install Express frame work in backend folder and import express method in app.js 
*/
const express = require('express');

const userRoutes = require('./routes/user'); //import user router

const app = express();
app.use(express.json());

const { Sequelize } = require('sequelize');
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);

/* sequelize.authenticate()
    .then(() => {
        console.log('successfully connected to PostgresSQL!');
    }).catch((error) => {
        console.log('unable to connect to the Database!');
        console.error(error);
    }); */
sequelize.sync({ alter: true });

//Set up headers with CORS (cross-origin resource sharing) 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.use('/images', express.static(path.join(__dirname, 'images')));  
//app.use('/api/sauces',sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;