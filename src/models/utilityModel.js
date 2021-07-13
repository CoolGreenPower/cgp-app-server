const { Schema, model } = require('mongoose')
const buildings = require('../models/buildingModel')

const utilitySchema = new Schema({
    utilityType: {
        type: String
    },
    name: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    daysOfWeek: {
        type: [String]
    },
    timeFrom: {
        type: String 
    },
    timeTo: {
        type: String 
    }

})

module.exports = model('utilities', utilitySchema)