//Model for alerts

const { Schema, model } = require('mongoose')

const serviceCheckAlertSchema = new Schema({
    device: {
        type: Schema.Types.ObjectId,
        ref: 'utilities'
    },
    buildingId: {
        type: Schema.Types.ObjectId
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
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    notes: {
        type: String
    }
})

const serviceCheckAlert = model('serviceCheckAlerts', serviceCheckAlertSchema)
module.exports = serviceCheckAlert