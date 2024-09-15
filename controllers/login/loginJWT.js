const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const loginJWT = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) return res.status(404).send('User with this email does not exist');
        else if (!(await bcrypt.compare(password, foundUser.password))) return res.status(400).send("Wrong password");

        const tokenPayload = {
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
            _id: foundUser._id,
        }

        const token = jwt.sign(tokenPayload, process.env.secret, { expiresIn: "1h" })
        res.status(200).send({ token: token, message: "SUCCESS" })
    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR')
    }
}

module.exports = loginJWT;