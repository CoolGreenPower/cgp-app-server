const { insertServiceRecord } = require('../dao/serviceRecordDao')

const addServiceRecord = (serviceRecord) => {
    return new Promise((resolve, reject) => {
        insertServiceRecord(serviceRecord)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

module.exports = { addServiceRecord }