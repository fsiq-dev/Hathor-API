const fileUtils = require('../utils/file.utils')

const { createAddressDownload } = fileUtils

const KindListUser = (kind) => {
    switch (kind) {
        case "admin":
            return 1;
        case "partner":
            return 2;
        default:
            return 3;
            break;
    }
}

const toUserDTO = (model) => {
    const { id, email, kind, name, companyName, image} = model;
    return {
        id,
        email,
        name: name ? name : companyName,
        image: createAddressDownload('profile', image.name),
        kindUser: KindListUser(kind)
    }
}

module.exports = { 
    toUserDTO
}