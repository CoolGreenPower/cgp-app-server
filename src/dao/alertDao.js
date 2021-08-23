const LOGGER = require('../logger/logger')
const alert = require('../models/alertModel')
const user = require('../models/userModel')
const mongoose = require('mongoose')

const FILE_NAME = 'alertDao.js'

//find alert by alertId
const getAlertbyAlertId = (alertId) => {
    LOGGER.debug(`Entering getAlertbyAlertId in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {

        await alert.findById(alertId)
            .exec()
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

//find only resolved alerts by buildings by parent buildings
const fetchResolvedAlerts = async ({ userId }) => {
    LOGGER.debug(`Entering fetchResolvedAlerts in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {
        const attribute = {
            _id: 0,
            alerts: 1
        }

        await user.findById(userId, attribute)
            //populate buildings first, and then alerts
            .populate({
                path: 'sites',
                model: 'parentbuildings',
                populate: {
                    path: 'buildings',
                    model: 'buildings',
                    populate: {
                        path: 'alerts',
                        model: 'alerts'
                    }
                }
            })
            .exec()
            .then(res => resolve(res.sites))
            .catch(err => reject(err))
    })

}

//fetch alerts by alertId, alert category and specific dates
const findAlertsByConditions = async (query) => {
    LOGGER.debug(`Entering findAlertsByConditions in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {
        await alert.find({
            buildingId: mongoose.Types.ObjectId(query.buildingId),
            alertCategory: query.alertCategory,
            severity: query.severity.toLowerCase(),
            createdAt: {
                $gte: new Date(query.fromDate),
                $lte: new Date(query.toDate)
            }

        })
            .exec()
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}


const findAlertsByBuildingsByUserId = async ({ userId }) => {
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
                model: 'parentbuildings',
                populate: {
                    path: 'buildings',
                    model: 'buildings',
                    populate: {
                        path: 'alerts',
                        model: 'alerts'
                    }
                }
            })
            .exec()
            .then(res => resolve(res.sites))
            .catch(err => reject(err))
    })
}

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

//resolve alert
const resolveAlert = async query => {
    LOGGER.debug(`Entering resolve alert in :: ${FILE_NAME}`)
    return new Promise((resolve, reject) => {
        alert.findByIdAndUpdate(query.alertId, {
            "responsibleParty": query.responsibleParty,
            "updatedAt": query.updatedAt,
            "status": query.status,
            "notes": query.notes
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
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
            "status": query.status,
            "responsibleParty": query.responsibleParty,
            "updatedAt": query.updatedAt
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

//start service or change to 'Assigned'
const startService = async query => {
    LOGGER.debug(`Entering start service in :: ${FILE_NAME}`)

    return new Promise((resolve, reject) => {
        alert.findByIdAndUpdate(query.alertId, {
            "responsibleParty": query.responsibleParty,
            "updatedAt": query.updatedAt,
            "status": query.status,
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
    scheduleService,
    getAlertbyAlertId,
    startService,
    findAlertsByBuildingsByUserId,
    fetchResolvedAlerts,
    findAlertsByConditions,
    resolveAlert
}