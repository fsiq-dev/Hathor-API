const { category } = require('../models/index')
const  categoryMapper = require('../mapper/category.mapper')

const { toDTO } = categoryMapper

const listAll = async () => {
    const listCategoryDB = await category.find({})
    return listCategoryDB.map(categoryDB => {
        return toDTO(categoryDB)
    })
}
const createCategory = async (model) => {
    const newCategory = await category.create({
        name: model.name,
        description: model.description,
        status: model.status
    })
    return {
        sucsses: true,
        mensagem: `categoria criada com sucesso!`,
        data: toDTO(newCategory)
    }
}

module.exports = {
    listAll,
    createCategory
}