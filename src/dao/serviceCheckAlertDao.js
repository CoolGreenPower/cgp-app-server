const LOGGER = require('../logger/logger')
const alert = require('../models/alertModel')
const user = require('../models/userModel')

const FILE_NAME = 'serviceCheckAlertDao.js'

const findServiceCheckAlertsByBuildingsByUserId = async ({ userId }) => {
    LOGGER.debug(`Entering findServiceCheckAlertsByBuildingsByUserId in :: ${FILE_NAME}`)

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
                        path: 'serviceCheckAlerts',
                        model: 'serviceCheckAlerts'
                    }
                }
            })
            .exec()
            .then(res => resolve(res.sites))
            .catch(err => reject(err))
    })
}

module.exports = {
    findServiceCheckAlertsByBuildingsByUserId
}