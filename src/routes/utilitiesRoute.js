// const router = require('express').Router()
// const { authenticateToken } = require('../utils/authentication')
// const LOGGER = require('../logger/logger')
// const buildingsDao = require('../dao/buildingDao')
// const mongoose = require('mongoose')

// const FILE_NAME = 'utilityRoute.js'

// router.post('/', authenticateToken, async (req, res) => {
//     LOGGER.debug(`Entering get utilities route after token authentication :: ${FILE_NAME}`)
//     const query = {
        
//     }

//     await buildingsDao.getBuildingsByUser(query) 
//     .then(result => res.status(200).send(result))
//     .catch(err => 
//         console.log(err)
//         )
    
// })

// module.exports = router