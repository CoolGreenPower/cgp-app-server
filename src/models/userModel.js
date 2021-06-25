//Model for User
//category: Employee, Service Contractor, Owner etc

const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    userCategory: {
        type: String
    },
    sites: {
        type: [String]
    }
})

module.exports = model('users', userSchema)