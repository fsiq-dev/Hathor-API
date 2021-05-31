const fileUtils = require('../utils/file.utils')
const { createAddressDownload } = fileUtils
const toDTO = (model) => {
    return {

    }
}

const toListItemDTO = (model) => {
    const {_id, companyName, cnpj, address, accountable, image, phone, status} = model
    return {
        id: _id,
        companyName,
        cnpj,
        address,
        accountable,
        phone,
        image: createAddressDownload('profile', image.name),
        status
    }
}

module.exports = {
    toDTO,
    toListItemDTO
}