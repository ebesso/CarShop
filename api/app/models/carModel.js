const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Car', carSchema);