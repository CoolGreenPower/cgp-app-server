//Model for alerts

const { Schema, model } = require('mongoose')

const alertSchema = new Schema({
    site: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String
    },
    shortDesc: {
        type: String
    },
    detailedDesc: {
        type: String
    },
    alertCategory: {
        type: String
    },
    dateReported: {
        type: Date
    }
})

const alert = model('alerts', alertSchema)
module.exports = alert