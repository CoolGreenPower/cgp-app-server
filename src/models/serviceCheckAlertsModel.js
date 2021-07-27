//Model for alerts

const { Schema, model } = require('mongoose')

const serviceCheckAlertSchema = new Schema({
    device: {
        type: Schema.Types.ObjectId,
        ref: 'utilities'
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
    }, 
    servicesNeeded: {
        type: [String]
    }, 
    serviceDate: {
        type: Date
    },
    serviceTime: {
        type: String
    },
    responsibleParty: {
        type: String
    },
    updatedAt: {
        type: Date
    }
})

const serviceCheckAlert = model('serviceCheckAlerts', serviceCheckAlertSchema)
module.exports = serviceCheckAlert