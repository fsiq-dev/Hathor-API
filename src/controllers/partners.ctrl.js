const partnersService = require('../services/partners.service')
const  { createNewPartner } = partnersService
const createNewPartners = async (req, res , next) => {
    const { body } = req
    const resultService = await createNewPartner(body)
    const resultSucsses = resultService.sucsses ? 200 : 401;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}
    return res.status (resultSucsses).send({
        message: resultService.message,
        ...resultData
    })
}

module.exports = {
    createNewPartners,
}