const LOGGER = require('../logger/logger')
const alert = require('../models/alertModel')
const user = require('../models/userModel')

const FILE_NAME = 'alertDao.js'

const findAlertsByUserId = async ({ userId }) => {
    LOGGER.debug(`Entering findAlertsByUserId in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {
        const attribute = {
            _id: 0,
            alerts: 1
        }

        await user.findById(userId, attribute)
            //populate buildings first, and then alerts
            .populate({
                path: 'sites',
                model: 'buildings',
                populate: {
                    path: 'alerts',
                    model: 'alerts'
                }
            })
            .exec()
            .then(res => resolve(res.sites))
            .catch(err => reject(err))
    })

}

//update status, and serviceNeeded field
const updateServices = async (query) => {
    LOGGER.debug(`Entering updateServices in :: ${FILE_NAME}`)

    return new Promise((resolve, reject) => {
        alert.findByIdAndUpdate(query.alertId, {
            "servicesNeeded": query.servicesNeeded,
            "status": query.status
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

//schedule service
const scheduleService = async query => {
    LOGGER.debug(`Entering schedule service in :: ${FILE_NAME}`)

    return new Promise((resolve, reject) => {
        alert.findByIdAndUpdate(query.alertId, {
            "serviceDate": query.serviceDate,
            "serviceTime": query.serviceTime,
            "responsibleParty" : query.responsibleParty
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

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
    findAlertsBySiteName,
    findAlertsByUserId,
    updateServices,
    scheduleService
}