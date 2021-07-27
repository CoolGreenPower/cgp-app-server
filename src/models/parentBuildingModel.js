const mongoose = require('mongoose')

const parentBuildingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    owner: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    imageLink: {
        type: String
    },
    buildings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buildings'
    }]
})

module.exports = mongoose.model('parentbuildings', parentBuildingSchema)