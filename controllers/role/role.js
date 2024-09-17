const Role = require("../../models/Role");


const getAllRoles = async (req, res) => {
    try {
        const allRoles = await Role.find();
        const filteredRoles = allRoles.filter(role => role.name !== "Admin");
        res.status(200).send({ message: "SUCCESS", data: filteredRoles })

    } catch (error) {
        res.status(400).send({ message: "ERROR" })

    }
}

const createRole = async (req, res) => {
    const { name, description, permissionList } = req.body;
    try {
        const newRole = new Role({
            name: name,
            description: description,
            permissions: permissionList
        })
        await newRole.save();
        res.status(201).json({ message: "CREATED", role: newRole })
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "ERROR" })
    }

}

const editRole = async (req, res) => {
    const { name, description, permissionList } = req.body;
    const { roleId } = req.params;

    try {
        const existingRole = await Role.findById(roleId);
        if (!existingRole) res.status(404).send("Not found")
        else if (existingRole.name === "Admin") res.status(403).send("Forbidden");
        else {

            const updatedRole = await Role.findByIdAndUpdate(
                roleId,
                {
                    name: name,
                    description: description,
                    permissions: permissionList
                },
                { new: true }
            );
            res.status(202).json({ message: "Edited", data: updatedRole })
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "ERROR" })
    }
}

const deleteRole = async (req, res) => {
    const { roleId } = req.params;
    try {
        const deletedRole = await Role.findByIdAndDelete(roleId);
        if (!deletedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        return res.status(200).json({ message: "DELETED", data: deletedRole });
    } catch (error) {
        res.status(400).send({ message: "ERROR" })
    }
}

module.exports = { getAllRoles, createRole, editRole, deleteRole }