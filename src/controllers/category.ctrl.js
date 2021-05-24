const categoryService = require('../services/category.service')

const { listAll, createCategory } = categoryService

const findCategoryById = (req, res, next) => {
    return res.status(200).send([])
}
const listAllCategory = async (req, res, next) => {
    const result = await listAll()
    return res.status(200).send({ data: result })
}
const createNewCategory = async (req, res, next) => {
    const { body } = req

    const resultService = await createCategory(body)
    const resultSucsses = resultService.sucsses ? 200 : 400;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}

    return res.status(200).send(result)
}
const updateCategory = (req, res, next) => {
    return res.status(200).send()
}
const deleteCategory = (req, res, next) => {

}

module.exports = {
    findCategoryById,
    listAllCategory,
    createNewCategory,
    updateCategory,
    deleteCategory
}