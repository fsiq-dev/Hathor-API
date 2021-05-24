const toDTO = (model) => {
    const { _id, name, status} = model
    return {
        id: _id,
        name,
        description,
        status
    }
}

module.exports = {
    toDTO
}