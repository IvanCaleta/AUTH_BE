const express = require('express')
const Router = express.Router()
const { registerUser, passwordLogin, getAllRoles, createRole, editRole, deleteRole } = require('../controllers')

Router.post('/register', registerUser);
Router.post('/passwordLogin', passwordLogin);


//ROLES
Router.get('/roles', getAllRoles)
Router.post('/role', createRole)
Router.put('/role/:roleId', editRole)
Router.delete('/role/:roleId', deleteRole)

module.exports = Router;