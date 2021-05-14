const Joi = require('joi');

const ValidateDTO = (type, params) => {
    return (req, res, next) => {
        const schema = Joi.object().keys(params);
        const result = schema.validate(req[type], {
            allowUnknown: false
        });
        if (result.error) {
            const messages = result.error.details.reduce((acc, item) => {
                return [
                    ...acc, item.message
                ]
            }, []);

            res.status(400).send({
                details: [
                    ...messages
                ]
            })
        }
        return next();
    }
}

module.exports = ValidateDTO
