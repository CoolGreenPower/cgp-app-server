const User = require('../models/userModel')
const LOGGER = require('../logger/logger')
const Building = require('../models/buildingModel')

const FILE_NAME = 'buildingsDao.js'

const getBuildingsByUser = (query) => {
    LOGGER.debug(`Entering getBuildingsByUser in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {
        const attribute = {
            _id: 0,
            sites: 1
        }

        await User.find(query, attribute)
            .populate({
                path: 'sites',
                model: 'parentbuildings',
                populate: {
                    path: 'buildings',
                    model: 'buildings',
                    populate: {
                        path: 'utility',
                        model: 'utilities'
                    }
                }
            })
            // .populate('utilities')
            .exec()
            .then(res => {
                resolve(res)
            })
            .catch(err => reject(err))
    })
}

const getUsersByBuildingId = (buildingId) => {
    LOGGER.debug(`Entering getUsersByBuildingId in :: ${FILE_NAME}`)

    return new Promise(async (resolve, reject) => {

        const attribute = {
            _id: 0,
            authorizedusers: 1
        }

        await Building.findById(buildingId, attribute)
            .populate('authorizedusers')
            .exec()
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

module.exports = {
    getBuildingsByUser,
    getUsersByBuildingId
}