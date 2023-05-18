/**
 * install Express frame work in backend folder and import express method in app.js 
*/
const express = require('express');
const path = require('path');//import path

const userRoutes = require('./routes/user'); //import user router
const postRoutes = require('./routes/post'); //import post router


const app = express();
app.use(express.json());


//Set up headers with CORS (cross-origin resource sharing) 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));  
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;