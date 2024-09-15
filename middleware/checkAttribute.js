const Resource = require("../models/Resource");
const User = require("../models/User");


const checkAttribute = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).send("Not Authenticated");

        const foundUser= await User.findById(user._id);
        if (!foundUser) return res.status(401).send("Not Authenticated");

        const foundResource = await Resource.findById(req.params.resourceId)
        if(foundUser.accessLevel >= foundResource.securityLevel){
            return next();
        }
        else return res.status(401).send('Unauthorized by attribute')

    } catch (error) {
        console.log(error)
        res.status(400).send('ERROR')

    }
}

module.exports= checkAttribute