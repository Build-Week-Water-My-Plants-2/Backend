const express = require('express'); //importing a CommonJS module
const helmet = require('helmet'); //yarn add helmet
const cors = require('cors');
require('dotenv').config()
const authRouter = require('../routers/auth-router');
const plantsRouter = require('../routers/plants-router');
const usersRouter = require('../routers/users-router');
const server = express(); //creates the server
const mongoDB = require('../data/mongodbConfig')
//global middleware
server.use(express.json()); //middleware needed to parse JSON
server.use(helmet()); //middleware that adds a layer of security to the server
server.use(cors()); //middleware that allows cross domain communication from the browser
mongoDB(); // Connects to MongoDB

//endpoints
server.get('/', (req, res) => {
  res.status(200).json({ welcome: `to the danger zone!` });
});

//routes
server.use('/api/auth', authRouter);
server.use('/api/plants', plantsRouter);
server.use('/api/users', usersRouter);

module.exports = server