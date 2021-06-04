const categoryService = require('../services/category.service')

const { listAll, createCategory, listCategoryById, updateCategoryService, deleteCategoryService } = categoryService

const findCategoryById = async (req, res, next) => {
    const { id } = req.params
    const category = await listCategoryById(id)
    if(!category) {
        return res.status(404).send({
            details: [
                "categoria informada não existe"
            ]
        })
    }
    return res.status(200).send(category)
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

    return res.status(resultSucsses).send(resultData)
}
const updateCategory = async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    console.log(id, body)

    const resultService = await updateCategoryService(id, body)

    const resultSucsses = resultService.sucsses ? 200 : 400;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}

    return res.status(resultSucsses).send(resultData)
}
const deleteCategory = async (req, res, next) => {
    const {id} = req.params
    const resultService = await deleteCategoryService(id)

    const resultSucsses = resultService.sucsses ? 200 : 400;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}
    return res.status(resultSucsses).send(resultData)
}

module.exports = {
    findCategoryById,
    listAllCategory,
    createNewCategory,
    updateCategory,
    deleteCategory
}