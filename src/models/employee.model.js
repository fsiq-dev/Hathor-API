const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = {
    phone: {
        type: String,
        required: false,
    },
    partnersId: {
        type: Schema.Types.ObjectId,
        ref: 'partner'
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'event'
    }],
}

module.exports = employeeSchema;