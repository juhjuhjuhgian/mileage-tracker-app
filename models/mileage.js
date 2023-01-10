const mongoose = require('mongoose')
const mileageSchema = new mongoose.Schema({
    currentDay: {
        type: String,
        required: true
    },
    vehicleUsed: {
        type: String,
        required: true
    },
    odoStart: {
        type : Number,
        required: true
    },
    odoEnd: {
        type: Number,
        required: false
    },
    driver: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('MileageEntry', mileageSchema, 'logHistory')