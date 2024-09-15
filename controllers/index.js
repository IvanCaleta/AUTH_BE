const { registerUser } = require('./register/register')
const { passwordLogin } = require('./login/passwordLogin')
const { createRole, editRole, getAllRoles, deleteRole } = require('./role/role')
const { getAllUsers, editUser, deleteUser } = require('./user/user')
const { getAllResources, createResource, editResource, deleteResource } = require('./resource/resource')
const loginJWT = require('./login/loginJWT')

module.exports = {
    registerUser,
    passwordLogin,
    loginJWT,
    getAllRoles,
    createRole,
    editRole,
    deleteRole,
    getAllUsers,
    editUser,
    deleteUser,
    getAllResources,
    createResource,
    editResource,
    deleteResource,
}