const Resource = require("../../models/Resource")


const getAllResources = async (req, res) => {
    try {
        const allResources = await Resource.find();
        res.status(200).json({ message: "SUCCESS", data: allResources })
    } catch (error) {
        res.status(400).send("ERROR")
    }
}

const createResource = async (req, res) => {
    const { name, description, securityLevel } = req.body;
    try {
        const newResource = new Resource({
            name: name,
            description: description,
            securityLevel: securityLevel || 0
        })
        await newResource.save();
        res.status(201).json({ message: "CREATED", data: newResource })

    } catch (error) {
        res.status(400).send("ERROR")
    }
}

const editResource = async (req, res) => {
    const { name, description, securityLevel } = req.body;
    const { resourceId } = req.params;
    try {
        const foundResource = await Resource.findById(resourceId);
        if (!foundResource) {
            res.status(404).send("Resource not found")
        }
        else {
            const updatedResource = await Resource.findByIdAndUpdate(
                resourceId,
                {
                    name: name,
                    description: description,
                    securityLevel: securityLevel
                },
                { new: true }
            )
            res.status(202).json({ message: "UPDATED", data: updatedResource })
        }
    } catch (error) {
        res.status(400).send("ERROR")
    }
}

const deleteResource = async (req, res) => {
    const { resourceId } = req.params;
    try {
        const foundResource = await Resource.findById(resourceId);
        if (!foundResource) {
            res.status(404).send("Resource not found")
        }
        else {
            const deletedResource = await Resource.findByIdAndDelete(resourceId);
            res.status(204).json({ message: "DELETED", data: deletedResource })
        }
    } catch (error) {
        res.status(400).send("ERROR")
    }
}

module.exports= {getAllResources, createResource, editResource, deleteResource}