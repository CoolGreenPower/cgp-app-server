const express = require('express')
const app = express()
const bodyParser = express.json()
const cors = require('cors')
const mongoose = require('mongoose')

const { VAR_SERVER_PORT, VAR_DATABASE_URL } = require('./src/modules/ApplicationPropertiesSingleton')
const serviceRecordRoute = require('./src/routes/serviceRecordRoute')
const authRoute = require('./src/routes/auth')
const alerts = require('./src/routes/alertRoute')

mongoose.connect(`${VAR_DATABASE_URL}`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = Promise

app.use(bodyParser);
app.use(cors());
app.options('*', cors());

app.use('/serviceRecord', serviceRecordRoute)
app.use('/login/auth', authRoute)
app.use('/alerts', alerts)

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})

app.listen(VAR_SERVER_PORT, () => {
    console.log(`listening on ${VAR_SERVER_PORT}`)
})