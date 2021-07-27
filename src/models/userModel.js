//Model for User
//category: Employee, Service Contractor, Owner etc

const { Schema, model } = require('mongoose')
// const buildings = require('../models/buildingModel')
const parentbuildings = require('../models/parentBuildingModel')

const userSchema = new Schema({
    username: {
        type: String
    },
    userCategory: {
        type: String
    },
    sites: [{
                type: Schema.Types.ObjectId,
                ref: 'parentbuildings'
            }],
    password: {
        type: String
    }
})

module.exports = model('users', userSchema)