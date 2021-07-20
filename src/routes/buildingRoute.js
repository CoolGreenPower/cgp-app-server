const router = require('express').Router()
const { authenticateToken } = require('../utils/authentication')
const LOGGER = require('../logger/logger')
const buildingsDao = require('../dao/buildingDao')
const mongoose = require('mongoose')

const FILE_NAME = 'buildingRoute.js'

router.post('/', authenticateToken, async (req, res) => {
    LOGGER.debug(`Entering get buildings route after token authentication :: ${FILE_NAME}`)
    const query = {
        _id: mongoose.Types.ObjectId(req.body.userId)
    }

    await buildingsDao.getBuildingsByUser(query)
    .then(result => res.status(200).send(result))
    .catch(err => 
        console.log(err)
        )
    
})

//fetch building details
router.get('/users/:buildingId', async (req, res) => {
    LOGGER.debug(`Entering get buildingById route after token authentication :: ${FILE_NAME}`)
    // console.log(req.params.buildingId)

    await buildingsDao.getUsersByBuildingId(req.params.buildingId)
    .then(result => res.status(200).send(result))
    .catch(err => 
        console.log(err)
        )
})


module.exports = router