const LOGGER = require('../logger/logger')
const alert = require('../models/alertModel')

const FILE_NAME = 'alertDao.js'

const findAlerts = (query) => {
    LOGGER.debug(`Entering findAlertsBySiteName in :: ${FILE_NAME}`)
    alerts = []

    return new Promise(async (resolve, reject) => {
        await alert.find(query)
        .exec()
        .then(res => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                alerts.push(res[i]._doc)
            }
            resolve(alerts)
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    findAlerts
}