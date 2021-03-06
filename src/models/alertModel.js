//Model for alerts

const { Schema, model } = require('mongoose')

const alertSchema = new Schema({
    site: {
        type: String
    },
    buildingId: {
        type: Schema.Types.ObjectId
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: 'utilities'
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

const alert = model('alerts', alertSchema)
module.exports = alert