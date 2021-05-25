const fileUtils = require('../utils/file.utils')

const { createAddressDownload } = fileUtils

const toDTO = (model) => {
    const { _id, name, status, image} = model
    return {
        id: _id,
        name,
        status,
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