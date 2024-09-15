const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    securityLevel:{
        type: Number,
        default: 0,
        required: true,
    }
})

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;