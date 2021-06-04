const joi = require('joi')
const employeeCTRL = require('../../controllers/employee.ctrl')
//
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware')

const { listAllEmployee,createNewEmployee, createEventByEmployee } = employeeCTRL

module.exports = (Router) => {
    Router
        .route('/employee')
        .get(listAllEmployee)
    Router
        .route('/register/:id/employee')
        .post(
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
                email: joi.string().required().messages({
                    'any.required': `"email" é um campo obrigatório`,
                    'string.empty': `"email" não deve ser vazio`
                }),
                password: joi.string().required().messages({
                    'any.required': `"password" é um campo obrigatório`,
                    'string.empty': `"password" não deve ser vazio`
                }),
                phone: joi.string().required().messages({
                    'any.required': `"telefone" é um campo obrigatório`,
                    'string.empty': `"telefone" não deve ser vazio`
                }),
                categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),
                address: {
                    country: joi.string().required().messages({
                        'any.required': `"país" é um campo obrigatório`,
                        'string.empty': `"país" não deve ser vazio`
                    }),
                    state: joi.string().required().messages({
                        'any.required': `"estado" é um campo obrigatório`,
                        'string.empty': `"estado" não deve ser vazio`
                    }),
                    city: joi.string().required().messages({
                        'any.required': `"cidade" é um campo obrigatório`,
                        'string.empty': `"cidade" não deve ser vazio`
                    }),
                    zip: joi.number().required().messages({
                        'any.required': `"cep" é um campo obrigatório`,
                        'string.empty': `"cep" não deve ser vazio`
                    }),
                    address: joi.string().required().messages({
                        'any.required': `"endereço" é um campo obrigatório`,
                        'string.empty': `"endereço" não deve ser vazio`
                    }),
                },
                status: joi.boolean().required().messages({
                    'any.required': `"status" é um campo obrigatório`,
                    'string.empty': `"status" não deve ser vazio`
                }),
            }, {
                allowUnknown: true,
            }),
            createNewEmployee
        )
    Router
        .route('/employee/:id/events')
        .get()
        .post(
            validateDTO('params', {
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),          
            }),
            validateDTO('body', {
                events: {
                    title: joi.string().required().messages({
                        'any.required': `"titulo" é um campo obrigatório`,
                        'string.empty': `"titulo" não deve ser vazio`
                    }),
                    description: joi.string().required().messages({
                        'any.required': `"descrição" é um campo obrigatório`,
                        'string.empty': `"descrição" não deve ser vazio`
                    }),

                    start: joi.string().required().messages({
                            'any.required': `"data de inicio" é um campo obrigatório`,
                            'string.empty': `"data de inicio" não deve ser vazio`
                    }),
                    end:joi.string().required().messages({
                        'any.required': `"data de termino" é um campo obrigatório`,
                        'string.empty': `"data de termino" não deve ser vazio`
                    })
                }
            }),
            createEventByEmployee
        )
}