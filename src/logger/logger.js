const log4js = require('log4js')
const logger = log4js.getLogger()

logger.level = 'debug'

log4js.configure({
    appenders: {
        out: {
            type: 'stdout'
        },
        app: {
            type: 'file',
            filename: './logs/server.log',
            maxLogSize: 10485760,
            backups: 1,
            compress: true
        }
    },
    categories: {
        default: {
            appenders: ['out', 'app'],
            level: "debug"
        }
    }
})

logger.debug('logger level on debug')
module.exports = logger