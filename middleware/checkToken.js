const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.get("authorization").replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("Token is needed for authentication");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.secret);
        req.user = decodedToken;
        return next();
    } catch (error) {
        console.log(error)
        return res.status(401).send("Invalid token")
    }
}

module.exports = checkToken;