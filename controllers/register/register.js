const User = require('../../models/User')
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hash = await bcrypt.hash(password.toString(), 10)
        const newUser = new User({
            name: name,
            email: email,
            password: hash,
            role: role
        });

        await newUser.save();
        res.status(201).json({ message: "SUCCESS" });
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "ERROR" })
    }
}

module.exports = { registerUser };