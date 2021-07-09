const LOGGER = require('../logger/logger')
const alert = require('../models/alertModel')
const user = require('../models/userModel')

const FILE_NAME = 'alertDao.js'

const findAlertsBySiteName = (sites) => {
    LOGGER.debug(`Entering findAlertsBySiteName in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {
        
        const tquery = {
            $or: []
        }

        for (let i = 0; i < sites.length; i++) {
            tquery.$or.push({
                "site": sites[i]
            })
        }

        await alert.find(tquery)
        .exec()
        .then(res => {
            // console.log(res)
            for (let i = 0; i < res.length; i++) {
                alerts.push(res[i]._doc)
            }
            resolve(alerts)
        })
        .catch(err => reject(err))
    })
}

const findAlerts = (query) => {
    LOGGER.debug(`Entering findAlertsBySiteName in :: ${FILE_NAME}`)
    alerts = []

    return new Promise(async (resolve, reject) => {
        
        await alert.find(query)
        .exec()
        .then(res => {
            // console.log(res)
            for (let i = 0; i < res.length; i++) {
                alerts.push(res[i]._doc)
            }
            resolve(alerts)
        })
        .catch(err => reject(err))
    })
}

const findSites = (query) => {
    LOGGER.debug(`Entering findSites in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {
        
        const attribute = {
            sites: 1,
            _id: 0
        }

        await user.findById(query, attribute)
        .exec()
        .then(res => {
            console.log(res)
            resolve(res)
        })
        .catch(err => reject(err))
        
    })
}

module.exports = {
    findAlerts,
    findSites,
    findAlertsBySiteName
}