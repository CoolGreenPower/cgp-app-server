const jwt = require('jsonwebtoken');
const { VAR_SECRET } = require('../modules/ApplicationPropertiesSingleton')

function authenticateToken(req, res, next) {
  const token = req.headers['x-auth-token']

  if (token == null) return res.status(401).send({
      "Error" : "Token not present. Could not be authenticated"
  })

  jwt.verify(token, VAR_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.status(403).send({
        "Error" : "Token did not match records"
    })

    next()
  })
}

module.exports = { authenticateToken }