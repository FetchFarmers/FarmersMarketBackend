const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils.js');

const { 
    //add database adapter functions
 } = require('../db')


















module.exports = usersRouter;