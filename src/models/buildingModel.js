const mongoose = require('mongoose')
const users = require('../models/userModel')
const utilities = require('../models/utilityModel')

const buildingSchema = new mongoose.Schema({
    alerts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'alerts'
    }],
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
    imageLink: {
        type: String
    },
    utility: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'utilities'
    }],
    authorizedusers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    permissions: {
        type: String
    }
})

module.exports = mongoose.model('buildings', buildingSchema)