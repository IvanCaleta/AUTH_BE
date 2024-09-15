const express = require('express')
const Router = express.Router()
const { registerUser, passwordLogin, getAllRoles, createRole, editRole, deleteRole, getAllUsers, editUser, deleteUser, getAllResources, createResource, editResource, deleteResource } = require('../controllers')

Router.post('/passwordLogin', passwordLogin);

//USERS
Router.get('/users', getAllUsers)
Router.post('/register', registerUser)
Router.put('/user/:userId', editUser)
Router.delete('/user/:userId', deleteUser)

//ROLES
Router.get('/roles', getAllRoles)
Router.post('/role', createRole)
Router.put('/role/:roleId', editRole)
Router.delete('/role/:roleId', deleteRole)

//RESOURCES
Router.get('/resources', getAllResources)
Router.post('/resource', createResource)
Router.put('/resource/:resourceId', editResource)
Router.delete('/resource/:resourceId', deleteResource)

module.exports = Router;