const User = require('../../models/User')
const bcrypt = require('bcrypt');

const findUser = async (email) => {
    try {
        let foundUser = new User
        foundUser = User.findOne({ email: email });
        return foundUser
    }
    catch (error) {
        throw Error('Error while getting user!')
    }
}

const passwordLogin = async (req, res) => {
    const { name, email, password, role } = req.body;
    const foundUser = await findUser(email);
    if (!foundUser) return res.status(404).send('User with this email does not exist');
    if (!(await bcrypt.compare(password, foundUser.password))) return res.status(404).send('Fail');

    console.log('Successfully login')
    res.status(200).json(foundUser);
}

module.exports = { passwordLogin };