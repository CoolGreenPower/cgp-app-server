const mongoose = require('mongoose')

const serviceRecordSchema = new mongoose.Schema({
    serviceProvider: {
        type: String,
        required: true
      },
      serviceTechnician:{
        type: String
      },
      siteName: {
        type: String,
        required: true,
      },
      serviceCategory: {
        type: String
      },
      deviceName: {
        type: String
      },
      serviceName: {
        type: String
      },
      lastServiceDate: {
        type: Date
      }
})

const ServiceRecord = mongoose.model('servicechecks', serviceRecordSchema)
module.exports = ServiceRecord