const express = require('express'); //importing a CommonJS module
const helmet = require('helmet'); //yarn add helmet
const cors = require('cors');
// const authRouter = require('../routers/auth-router');
const server = express(); //creates the server

//global middleware
server.use(express.json()); //middleware needed to parse JSON
server.use(helmet()); //middleware that adds a layer of security to the server
server.use(cors()); //middleware that allows cross domain communication from the browser

//endpoints
server.get('/', (req, res) => {
  res.status(200).json({ welcome: `to the danger zone!` });
});

//routes
// server.use('/api/auth', authRouter);

module.exports = server