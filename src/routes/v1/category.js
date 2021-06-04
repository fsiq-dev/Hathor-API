const categoryCTRL = require('../../controllers/category.ctrl')
const joi = require('joi')

//
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware')

const { findCategoryById, listAllCategory, createNewCategory, updateCategory, deleteCategory } = categoryCTRL
module.exports = (Router) => {
    Router
        .route('/category')
        .get(listAllCategory)
        .post(
            fileUploadMiddleware('categorys'),
            validateDTO('body', {
                name: joi.string().required().messages({
                    'any.required': `"nome" é um campo obrigatório`,
                    'string.empty': `"nome" não deve ser vazio`
                }),
                description: joi.string().required().messages({
                    'any.required': `"descricao" é um campo obrigatório`,
                    'string.empty': `"descricao" não deve ser vazio`
                }),
                status: joi.boolean().required().messages({
                    'any.required': `"status" é um campo obrigatório`,
                    'string.empty': `"status" não deve ser vazio`
                }),
            }, {
                allowUnknown: true,
            }),
            createNewCategory
            )
    Router
        .route('/category/:id')
        .get(
            validateDTO('params', {
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),          
            }),
            findCategoryById
        )
        .put(
            fileUploadMiddleware('categorys', true),
            validateDTO('params', {
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),          
            }),
            validateDTO('body', {
                name: joi.string().required().messages({
                    'any.required': `"nome" é um campo obrigatório`,
                    'string.empty': `"nome" não deve ser vazio`
                }),
                description: joi.string().required().messages({
                    'any.required': `"descricao" é um campo obrigatório`,
                    'string.empty': `"descricao" não deve ser vazio`
                }),
                status: joi.boolean().required().messages({
                    'any.required': `"status" é um campo obrigatório`,
                    'string.empty': `"status" não deve ser vazio`
                }),
            }, {
                allowUnknown: true,
            }),
            updateCategory
        )
        .delete(
            validateDTO('params', {
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),          
            }),
            deleteCategory
        )

}