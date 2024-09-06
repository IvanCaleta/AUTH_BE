const User = require('../../models/User')
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hash= await bcrypt.hash(password.toString(),10)
    const newUser = new User({
        name: name,
        email: email,
        password: hash,
    });

    await newUser.save();
    res.status(201).json({message: "SUCCESS"});
}

module.exports = {registerUser};