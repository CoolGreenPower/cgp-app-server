const express = require('express')
const app = express()
const { VAR_SERVER_PORT } = require('./src/modules/ApplicationPropertiesSingleton')

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})

app.listen(VAR_SERVER_PORT, () => {
    console.log(`listening on ${VAR_SERVER_PORT}`)
})