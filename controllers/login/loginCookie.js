const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

class Session {
    constructor(email, expiresAt) {
        this.email = email
        this.expiresAt = expiresAt
    }
    isExpired() {
        this.expiresAt < (new Date())
    }
}

const sessions = {}

const loginCookie = async (req, res) => {
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
        const timestamp = new Date()
        const expiresAt = new Date(timestamp.getTime() + 3600 * 1000)

        const session = new Session(email, expiresAt);
        sessions[token] = session

        res.cookie('user', token, { expires: expiresAt, secure: true, sameSite: 'none' })
        res.status(200).send({message: "SUCCESS"})
    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR')
    }
}

const logoutCookie = (req, res, next) => {
    const user = req.cookies?.user

    if (user) {
        res.clearCookie('user');
        delete sessions[user];
        next();
    }
    else next();
}

const checkCookie = (req) => {
    if (!req.cookies) return false;
    
    const user = req.cookies.user;
    if (!user) return false;
    
    const userSession = sessions[user];
    if (!userSession) return false;

    if (userSession.isExpired()) {
        delete sessions[user];
        return false;
    }

    return true;

}

module.exports = { loginCookie, checkCookie, logoutCookie };