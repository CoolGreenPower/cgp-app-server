const mongoose = require('mongoose')
const User = require('../models/userModel')

const buildingSchema = new mongoose.Schema({
    type: {
        type: String
    },
    name: {
        type: String
    },
    owner: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    users: {
        type: [String]
    },
    utility: {
        type: String
    },
    utilityacctnumber: {
        type: Number
    },
    authorizedusers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    permissions: {
        type: String
    }
})

module.exports = mongoose.model('buildings', buildingSchema)