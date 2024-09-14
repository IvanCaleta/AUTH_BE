const { registerUser } = require('./register/register')
const { passwordLogin } = require('./login/passwordLogin')
const { createRole, editRole, getAllRoles, deleteRole } = require('./role/role')

module.exports = {
    registerUser,
    passwordLogin,
    getAllRoles,
    createRole,
    editRole,
    deleteRole,

}