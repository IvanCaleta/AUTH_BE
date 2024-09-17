const Role = require("../../models/Role");
const User = require("../../models/User")

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password').populate("role", "name");
        const adminRole = await Role.find({ name: "Admin" });
        const filteredUsers = allUsers.filter(user => user.role.name.toString() !== adminRole[0].name.toString());
        res.status(200).send({ message: "SUCCESS", data: filteredUsers })
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "ERROR" })
    }

}

const editUser = async (req, res) => {
    const { roleId, accessLevel } = req.body;
    const { userId } = req.params;
    try {
        const adminRole = await Role.find({ name: "Admin" });
        const adminUser = await User.find({ role: adminRole[0]._id.toString() })
        const foundUser = await User.findById(userId)
        if (userId === adminUser[0]._id.toString()) res.status(403).send("Forbidden")
        else if (!foundUser) res.status(404).send("Not found")
        else {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    ...roleId && ({ role: roleId }),
                    ...accessLevel !== undefined && ({ accessLevel: accessLevel }),
                },
                { new: true }
            );
            res.status(202).json({ message: "Edited", data: updatedUser })
        }
    } catch (error) {
        res.status(400).send({ message: "ERROR" })
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params
    try {
        const adminRole = await Role.find({ name: "Admin" });
        const adminUser = await User.find({ role: adminRole[0]._id.toString() })
        if (userId === adminUser[0]._id.toString()) res.status(403).send("Forbidden")
        else {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(204).json({ message: "DELETED", data: deletedUser });
        }

    } catch (error) {
        res.status(400).send({ message: "ERROR" })
    }
}

module.exports = { getAllUsers, editUser, deleteUser }