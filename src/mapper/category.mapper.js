const fileUtils = require('../utils/file.utils')
const moment = require('moment')    

const { createAddressDownload } = fileUtils

const toDTO = (model) => {
    const { _id, name, description, status, image, createdAt} = model
    return {
        id: _id,
        name,
        description,
        status,
        createdAt: moment(createdAt).format('L'),
        image: createAddressDownload('categorys', image.name)
    }
}
const toListByIdDTO = (model) => {
    const { _id, name, status, description, image} = model
    return {
        id: _id,
        name,
        description,
        status,
        image: createAddressDownload('categorys', image.name)
    }

}

module.exports = {
    toDTO,
    toListByIdDTO
}