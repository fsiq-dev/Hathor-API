const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const createSchema = (modelPai, model, options = {}) => {
    return new Schema({
        ...modelPai,
        ...model,
    }, {
        timestamps: true,
        collection: 'users',
        ...options,
    })
}

const userSchema =  require ('./user.model')
const user = mongoose.model('user', createSchema(undefined, userSchema, {
    discriminatorKey: 'kind',
}))

const adminSchema  = require('./admin.model')
const admin = user.discriminator('admin', createSchema(userSchema, adminSchema, {}))

module.exports = {
    user,
    admin
}