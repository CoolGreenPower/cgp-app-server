const router = require('express').Router()
const LOGGER = require('../logger/logger')
const { addServiceRecord } = require('../services/serviceRecordService')

const FILE_NAME = 'serviceRecordRoute.js'

router.post(`/`, (req, res) => {
    LOGGER.debug(`Entering service record route in ${FILE_NAME}`)
    addServiceRecord(req.body)
    .then()
    .catch()
})

module.exports = router