const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    permissions: {
        type: [String],
    }

})

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role