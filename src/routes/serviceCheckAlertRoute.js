const router = require('express').Router()
const LOGGER = require('../logger/logger')
const { authenticateToken } = require('../utils/authentication')
const serviceCheckAlertDao = require('../dao/serviceCheckAlertDao')
const mongoose = require('mongoose')

const FILE_NAME = "serviceCheckAlertRoute"

//route to return servicecheckalerts beloging to a user's buildings
/**
 * Accepts userId
 * Returns servicecheckalerts belonging to the buildings associated with this userId
 */
 router.post('/buildings', authenticateToken, async (req, res) => {
    LOGGER.debug(`Entering post service check alert route after token authentication :: ${FILE_NAME}`)

    const query = { userId: req.body.userId }

    //fetch alerts belonging to this userId
    await serviceCheckAlertDao.findServiceCheckAlertsByBuildingsByUserId(query)
    .then((r) => {res.status(200).send(r)})
    .catch(e => res.status(400).send(e))
    
})

//route to update Services Selected and also, status of the alert
router.post('/updateServices', authenticateToken, async (req, res) => {
    await serviceCheckAlertDao.updateServices(req.body)
    .then(r => res.status(200).send(r))
    .catch(err => res.status(400).send(err))
})

module.exports = router