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

// USUARIOS
const userSchema =  require ('./user.model')
const user = mongoose.model('user', createSchema(undefined, userSchema, {
    discriminatorKey: 'kind',
}))

// ADMIN
const adminSchema  = require('./admin.model')
const admin = user.discriminator('admin', createSchema(userSchema, adminSchema, {}))

//PARCEIROS
const partnerSchema  = require('./partners.model')
const partner = user.discriminator('partner', createSchema(userSchema, partnerSchema, {}))


// CATEGORIA
const categorySchema = require('./category.model')
const category = mongoose.model('category', createSchema(undefined, categorySchema, {
    collection: 'category',
}))

module.exports = {
    user,
    admin,
    category,
    partner
}