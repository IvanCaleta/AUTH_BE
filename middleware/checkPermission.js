const Role = require("../models/Role");


const checkPermission = async (req, res, next, permission) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).send("Not Authenticated");

        const foundRole = await Role.findById(user.role || user._doc?.role);
        if (!foundRole) return res.status(401).send("Unauthorized");

        if (foundRole.permissions.includes(permission)) {
            return next();
        }
        else return res.status(401).send("User does not have requested permission!");

    } catch (error) {
        res.status(400).send('ERROR')
    }
}

module.exports = checkPermission;