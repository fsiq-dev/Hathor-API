const fileUtils = require('../utils/file.utils')

const { createAddressDownload } = fileUtils

const KindListUser = (kind) => {
    switch (kind) {
        case "admin":
            return 1;
        case "partner":
            return 2;
        case "employee":
            return 3;
        default:
            return 4;
            break;
    }
}

const toUserDTO = (model) => {
    const { id, email, kind, name, companyName, image, address} = model;
    return {
        id,
        email,
        name: name ? name : companyName,
        image: createAddressDownload('profile', image.name),
        address,
        kindUser: KindListUser(kind)
    }
}

module.exports = { 
    toUserDTO
}