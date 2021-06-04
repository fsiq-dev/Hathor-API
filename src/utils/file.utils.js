const path = require('path')
const fs = require('fs');
const uuid = require('uuid').v4
const rootAddress = process.env.FILE_BASE_PATH

const createAddress = (destination, fileName = "") => {
    return path.join(rootAddress, destination, fileName)
}

const renameFile = (type) => {
    const typeSlited = type.split('/')[1]
    return `${uuid()}.${typeSlited}`
}
const moveFile = (temp, fixed) => {
    return fs.renameSync(temp, fixed)
}

const createAddressDownload = (origin, fileName) => {
    const Path = `/static/${origin}/${fileName}`
    return Path
}

const removeFile = (origin, fileName) => {
    const addressFile = createAddress(origin, fileName)
    if(fs.existsSync(addressFile)) {
        fs.unlinkSync(addressFile)
    }
}

module.exports = {
    createAddress,
    renameFile,
    moveFile,
    createAddressDownload,
    removeFile
}