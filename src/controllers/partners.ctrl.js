const partnersService = require('../services/partners.service')
const  { createNewPartner, listAllPartnerService, changeStatus } = partnersService

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
const listAllPartners = async (req, res, next) => {
    const data = await listAllPartnerService()
    res.status(200).send({
        data,
    })
}
const active = async (req, res, next) => {
    const { id } = req.params 

    const resultService = await changeStatus(id, 'Ativo')

    const resultSucsses = resultService.sucsses ? 200 : 401;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}
    return res.status (resultSucsses).send({
        message: 'operacão realizada com sucesso',
        ...resultData
    })
}
const inactive = async (req, res, next) => {
    const { id } = req.params 

    const resultService = await changeStatus(id, 'Inativo')

    const resultSucsses = resultService.sucsses ? 200 : 401;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}
    return res.status (resultSucsses).send({
        message: 'operacão realizada com sucesso',
        ...resultData
    })
}
module.exports = {
    createNewPartners,
    listAllPartners,
    active,
    inactive
}