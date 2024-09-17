const jwt = require("jsonwebtoken");
const { checkCookie } = require("../controllers/login/loginCookie");
require("dotenv").config();

const checkToken = (req, res, next) => {
    const tokenFromHeader = req.get("authorization")?.replace("Bearer ", "");

    if (!tokenFromHeader && !checkCookie(req)) {
        return res.status(401).send("Token is needed for authentication");
    }
    try {
        const token = req.cookies.user || tokenFromHeader  ;
        const decodedToken = jwt.verify(token, process.env.secret);
        req.user = decodedToken;
        return next();
    } catch (error) {
        console.log(error)
        return res.status(401).send("Invalid token")
    }
}

module.exports = checkToken;