const express = require('express')
const Router = express.Router()
const { registerUser, passwordLogin, getAllRoles, createRole, editRole, deleteRole, getAllUsers, editUser, deleteUser, getAllResources, createResource, editResource, deleteResource, loginJWT, loginCookie, loginOauth, logoutCookie } = require('../controllers')
const { checkToken, checkPermission, checkAttribute } = require('../middleware');

//AUTHENTICATE
Router.post('/passwordLogin', passwordLogin);
Router.post('/loginJWT', loginJWT);
Router.post('/loginCookie', loginCookie);
Router.post('/oauth',loginOauth)

//LOGOUT
Router.get('/logout', (req, res, next) => logoutCookie(req,res,next), (req, res) => {
    req.user = null;
    res.status(200).send("Logged out")
})

//USERS
Router.get('/users', checkToken, (req, res, next) => checkPermission(req, res, next, "view-user"), getAllUsers)
Router.post('/register', checkToken, (req, res, next) => checkPermission(req, res, next, "create-user"), registerUser)
Router.put('/user/:userId', checkToken, (req, res, next) => checkPermission(req, res, next, "edit-user"), editUser)
Router.delete('/user/:userId', checkToken, (req, res, next) => checkPermission(req, res, next, "delete-user"), deleteUser)

//ROLES
Router.get('/roles', checkToken, (req, res, next) => checkPermission(req, res, next, "view-role"), getAllRoles)
Router.post('/role', checkToken, (req, res, next) => checkPermission(req, res, next, "create-role"), createRole)
Router.put('/role/:roleId', checkToken, (req, res, next) => checkPermission(req, res, next, "edit-role"), editRole)
Router.delete('/role/:roleId', checkToken, (req, res, next) => checkPermission(req, res, next, "delete-role"), deleteRole)

//RESOURCES
Router.get('/resources', checkToken, (req, res, next) => checkPermission(req, res, next, "view-resource"), getAllResources)
Router.post('/resource', checkToken, (req, res, next) => checkPermission(req, res, next, "create-resource"), createResource)
Router.put('/resource/:resourceId', checkToken, (req, res, next) => checkPermission(req, res, next, "edit-resource"), checkAttribute, editResource)
Router.delete('/resource/:resourceId', checkToken, (req, res, next) => checkPermission(req, res, next, "delete-resource"), checkAttribute, deleteResource)

module.exports = Router;