const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    permissionList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission'
        }
    ]
})

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role