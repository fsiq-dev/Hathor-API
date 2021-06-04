const joi =  require('joi')

const partnersCTRL = require(`../../controllers/partners.ctrl`)

const { createNewPartners, listAllPartners, active , inactive } = partnersCTRL

const ValidateDTO = require('../../utils/middlewares/validate-dto.middleware')

module.exports = (Router) => {
    Router
        .route('/partners')
        .get(listAllPartners)
        .post(
            ValidateDTO('body', {
                name: joi.string().required().messages({
                    'any.required': `"Nome" é um campo obrigatório`,
                    'string.empty': `"Nome" não deve ser vazio`
                }),
                companyName: joi.string().required().messages({
                    'any.required': `"companyName" é um campo obrigatório`,
                    'string.empty': `"companyName" não deve ser vazio`
                }),
                address: joi.string().required().messages({
                    'any.required': `"endereco" é um campo obrigatório`,
                    'string.empty': `"endereco" não deve ser vazio`
                }),
                cnpj: joi.string().required().messages({
                    'any.required': `"cnpj" é um campo obrigatório`,
                    'string.empty': `"cnpj" não deve ser vazio`
                }),
                uf: joi.string().required().messages({
                    'any.required': `"uf" é um campo obrigatório`,
                    'string.empty': `"uf" não deve ser vazio`
                }),
                city: joi.string().required().messages({
                    'any.required': `"cidade" é um campo obrigatório`,
                    'string.empty': `"cidade" não deve ser vazio`
                }),
                accountable: joi.string().required().messages({
                    'any.required': `"responsavel" é um campo obrigatório`,
                    'string.empty': `"responsavel" não deve ser vazio`
                }),
                phone: joi.string().required().messages({
                    'any.required': `"telefone" é um campo obrigatório`,
                    'string.empty': `"telefone" não deve ser vazio`
                }),
                email: joi.string().required().messages({
                    'any.required': `"email" é um campo obrigatório`,
                    'string.empty': `"email" não deve ser vazio`
                }),
                password: joi.string().required().messages({
                    'any.required': `"password" é um campo obrigatório`,
                    'string.empty': `"password" não deve ser vazio`
                }), 
            }),

        createNewPartners
        )
    
    Router
        .route('/partners/:id/active')
        .put(
            ValidateDTO('params', {
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),
            }),
            active
        )
    
    Router
        .route('/partners/:id/inactive')
        .put(
            ValidateDTO('params', {
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                    'any.required': `"categoria id" é um campo obrigatório`,
                    'string.empty': `"categoria id" não deve ser vazio`,
                    'string.regex': `"categoria id" fora do formato experado`,
                }),
            }),
            inactive
        )
}

