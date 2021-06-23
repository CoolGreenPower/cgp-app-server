const express = require('express')
const app = express()
const bodyParser = express.json()
const cors = require('cors')

const { VAR_SERVER_PORT } = require('./src/modules/ApplicationPropertiesSingleton')
const serviceRecordRoute = require('./src/routes/serviceRecordRoute')

app.use(bodyParser);
app.use(cors());
app.options('*', cors());

app.use('/serviceRecord', serviceRecordRoute)

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})

app.listen(VAR_SERVER_PORT, () => {
    console.log(`listening on ${VAR_SERVER_PORT}`)
})