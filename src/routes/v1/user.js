const userCTRL = require ('../../controllers/user.ctrl')
const  validateDTO = require('../../utils/middlewares/validate-dto.middleware')

const joi = require('joi')

module.exports = (Router) => {
    Router
        .route('/auth')
        .post(
            validateDTO('body', {
                email: joi.string().required().messages({
                    'any.required': `"e-mail" é um campo obrigatório`,
                    'string.empty': `"e-mail" não deve ser vazio`,
                }),
                password: joi.string().required().messages({
                    'any.required': `"senha" é um campo obrigatório`,
                    'string.empty': `"senha" não deve ser vazio`,
                }),
            }),
            userCTRL.auth
        )
}