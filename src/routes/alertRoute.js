const router = require('express').Router()
const LOGGER = require('../logger/logger')
const { authenticateToken } = require('../utils/authentication')
const alertDao = require('../dao/alertDao')
const alertService = require('../services/alertService')
const mongoose = require('mongoose')

const FILE_NAME = 'alertRoute.js'

//fetch alert
router.get('/:id', authenticateToken, async (req, res) => {
    LOGGER.debug(`Entering get alertById route after token authentication :: ${FILE_NAME}`)

    await alertDao.getAlertbyAlertId(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => 
        console.log(err)
        )
})


//route to update Services Selected and also, status of the alert
router.post('/updateServices', authenticateToken, async (req, res) => {
    await alertDao.updateServices(req.body)
    .then(r => res.status(200).send(r))
    .catch(err => res.status(400).send(err))
})

/**
 * Route to schedule service
 * 
 * Accepts alertId, serviceDate, serviceTime, responsibleParty
 * Returns acknowledgement
 */
router.post('/scheduleService', authenticateToken, async (req, res) => {
    await alertDao.scheduleService(req.body)
    .then(r => res.status(200).send(r))
    .catch(err => res.status(400).send(err))
    
})

/**
 * Route to start service
 * 
 * Accepts alertId, updatedAt, status, responsibleParty
 * Returns acknowledgement
 */
 router.post('/startService', authenticateToken, async (req, res) => {
    await alertDao.startService(req.body)
    .then(r => res.status(200).send(r))
    .catch(err => res.status(400).send(err))
    
})


//route to return alerts beloging to a user's buildings
/**
 * Accepts userId
 * Returns alerts belonging to the buildings associated with this userId
 */
 router.post('/', async (req, res) => {
    LOGGER.debug(`Entering post alert route after token authentication :: ${FILE_NAME}`)

    const query = { userId: req.body.userId }

    //fetch alerts belonging to this userId
    await alertService.findAlertsByBuildingsByUserId(query)
    .then((r) => {res.status(200).send(r)})
    .catch(e => res.status(400).send(e))
    
})


//route to return alerts beloging to a user's buildings
/**
 * Accepts userId
 * Returns alerts belonging to the buildings associated with this userId
 */
router.post('/buildings', async (req, res) => {
    LOGGER.debug(`Entering post alert route after token authentication :: ${FILE_NAME}`)

    const query = { userId: req.body.userId }

    //fetch alerts belonging to this userId
    await alertService.findAlertsByBuildingsByUserId(query)
    .then((r) => {res.status(200).send(r)})
    .catch(e => res.status(400).send(e))
    
})


//route to return alerts filtered with alertCategory
router.post('/category', authenticateToken, (req, res) => {
    LOGGER.debug(`Entering post category alert route after token authentication :: ${FILE_NAME}`)
    
    sites = []

    const query = {
        _id: mongoose.Types.ObjectId(req.body.userId)
    }

    alertService.findAlerts(query)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(401).send(err)
    })
})

module.exports = router