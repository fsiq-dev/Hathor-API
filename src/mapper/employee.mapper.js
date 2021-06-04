const fileUtils = require('../utils/file.utils')
const { createAddressDownload } = fileUtils

const toDTO = (model) => {
    const {_id, name, email, image, phone, status, address } = model
    return {
        id: _id,
        name,
        email,
        phone,
        address,
        image: createAddressDownload('profile', image.name),
        status
    }
}

module.exports = {
    toDTO,
}