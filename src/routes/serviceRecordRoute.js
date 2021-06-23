const router = require('express').Router()
const LOGGER = require('../logger/logger')

const FILE_NAME = 'serviceRecordRoute.js'

router.post(`/`, (req, res) => {
    console.log(req.body)
})

module.exports = router