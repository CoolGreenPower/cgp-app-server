const router = require('express').Router()
const LOGGER = require('../logger/logger')
const { authenticateToken } = require('../utils/authentication')
const alertDao = require('../dao/alertDao')

const FILE_NAME = 'alertRoute.js'

router.post('/', authenticateToken, (req, res) => {
    LOGGER.debug(`Entering post alert route after token authentication :: ${FILE_NAME}`)
    const query = {
        site: req.body.siteName
    }
    
    alertDao.findAlertsBySiteName(query)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(401).send(err)
    })
})

module.exports = router