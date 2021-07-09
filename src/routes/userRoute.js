const router = require('express').Router()
const LOGGER = require('../logger/logger')
const { authenticateToken } = require('../utils/authentication')

const FILE_NAME = 'userRoute.js'

//route to return user
router.get('/', authenticateToken, (req, res) => {
    LOGGER.debug(`Entering post alert route after token authentication :: ${FILE_NAME}`)
      
})