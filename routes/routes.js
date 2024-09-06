const express = require('express')
const Router = express.Router()
const {registerUser, passwordLogin}= require('../controllers')

Router.post('/register', registerUser);
Router.post('/passwordLogin', passwordLogin);

module.exports = Router;