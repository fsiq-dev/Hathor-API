const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    image: {
        initialName: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        }
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }]
}
  
module.exports = categorySchema;