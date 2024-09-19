const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Role = require('../../models/Role');
require("dotenv").config();

const loginOauth = async (req, res) => {
    const { token } = req.body;
    const decoded = jwt.decode(token)
    const foundUser = await User.findOne({ name: decoded.name })
    const viewerRole = await Role.findOne({ name: 'Viewer' })
    let newUser
    let foundUserRole = null;
    let tokenPayload

    if (!foundUser?.name) {
        newUser = new User({
            email: decoded.email,
            name: decoded.name,
            accessLevel: 0,
            role: viewerRole?._id
        })
        await newUser.save()
        tokenPayload = { ...decoded, ...newUser }
    }
    else {
        foundUserRole = await Role.findById(foundUser.role)
        tokenPayload = { ...decoded, ...foundUser }
    }


    const signedToken = jwt.sign(tokenPayload, process.env.secret)
    res.status(200).send({ token: signedToken, username: foundUser?.name || decoded.name, permissions: foundUserRole?.permissions || ['view-resource'] })
}

module.exports = loginOauth