const envalid = require('envalid')
const { str, port } = envalid

const env = envalid.cleanEnv(process.env, {
    SERVER_PORT : port(),
 })
    
module.exports = {
    VAR_SERVER_PORT : env.SERVER_PORT
}