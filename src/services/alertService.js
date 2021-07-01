const LOGGER = require('../logger/logger')
const FILE_NAME = 'alertService.js'
const alertDao = require('../dao/alertDao')

const findAlerts = (query) => {
    LOGGER.debug(`Entering findAlerts function of ${FILE_NAME}`)
    return new Promise(async (resolve, reject) => {
        await alertDao.findSites(query)
        .then(async res => {
            await alertDao.findAlertsBySiteName(res._doc.sites)
            .then(r => resolve(r))
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    findAlerts
}