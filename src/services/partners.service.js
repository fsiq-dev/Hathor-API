const  { partner, employee } = require('../models/index')
const { toListItemDTO } = require('../mapper/partners.mapper')
const { emailAlreadyExist } = require('../services/user.service')
const { createHash } = require('../utils/cryptograph.utils')

const cnpjAlreadyExist = async (cnpj) => {
    const result = await partner.find({
        cnpj
    })
    return result.length > 0 ? true : false
}

const createNewPartner =  async (model) => {
    const { email, password, cnpj, ...rest } = model

    //validate cnpj
    if(await cnpjAlreadyExist(cnpj))
        return{
            sucsses: false,
            message: 'operação não pode ser realizada',
            details: [
                'Já existe fornecedor cadastrado para o cnpj informado'
            ]
        }
    
    if(await emailAlreadyExist(email))
        return{
            sucsses: false,
            message: 'operação não pode ser realizada',
            details: [
                'Já existe usuário cadastrado para o email informado'
            ]
        }
    
    const newPartner = await partner.create({
        email,
        cnpj,
        ...rest,
        password: createHash(password),
        status: "Analise"
    })
    return {
        sucsses: true,
        message: 'Operação realizada com sucesso',
        data: {
            ...toListItemDTO(newPartner)
        }
    }
}

const listAllPartnerService = async (filter) => {
    // const {status} = filter

    // const body = {}

    // if(status) {
    //     body.status = status
    // }

    const resultDB = await partner.find();

    return resultDB.map(item => {
        return toListItemDTO(item)
    })
}

const changeStatus = async (id, status) => {
    const resultDB = await partner.findById(id)
    
    if(!resultDB) {
        return{
            sucsses: false,
            message: 'operação não pode ser realizada',
            details: [
                'Desculpe não foi encontrado um parçeiro com esse id'
            ]
        }
    }
    resultDB.status = status

    await resultDB.save()

    return {
        sucsses: true,
        message: 'Operacão realizada com sucesso!',
        data: {
            ...toListItemDTO(resultDB)
        }
    }
}

module.exports = {
    createNewPartner,
    listAllPartnerService,
    changeStatus,
}
