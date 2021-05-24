const categoryCTRL = require('../../controllers/category.ctrl')
const joi = require('joi')

//
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')

const { findCategoryById, listAllCategory, createNewCategory, updateCategory, deleteCategory } = categoryCTRL
module.exports = (Router) => {
    Router
        .route('/category')
        .get(listAllCategory)
        .post(
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
            }),
            createNewCategory
            )
    Router
        .route('/category/:id')
        .get(
            validateDTO('params', {
                idCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),          
            }),
            findCategoryById
        )
        .put(
            validateDTO('params', {
                idCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
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
            }),
            updateCategory
        )
        .delete(
            validateDTO('params', {
                idCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),          
            }),
            deleteCategory
        )

}