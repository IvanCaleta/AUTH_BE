const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true,
        unique: true,
    },
    password: {
        type: "String",
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Role'
    },
    accessLevel:{
        type: "Number",
        default: 0
    }

})

const User = mongoose.model('User', UserSchema);
module.exports = User;