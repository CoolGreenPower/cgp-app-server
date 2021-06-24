const LOGGER = require('../logger/logger')
const serviceCheckModel = require('../models/serviceCheckModel')

const insertServiceRecord = (serviceRecord) => {
    return new Promise((resolve, reject) => {
        serviceCheckModel.create({
            serviceProvider: serviceRecord.serviceProvider,
            serviceTechnician: serviceRecord.serviceTechnician,
            siteName: serviceRecord.siteName,
            serviceCategory: serviceRecord.serviceCategory,
            deviceName: serviceRecord.deviceName,
            serviceName: serviceRecord.serviceName,
            lastServiceDate: new Date()
        }, function (err, r) {
            if (err) reject(err)
            else resolve(r)
        })
    })
}

module.exports = { insertServiceRecord }