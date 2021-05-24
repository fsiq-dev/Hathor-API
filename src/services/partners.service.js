const  { partner } = require('../models/index')
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
        mensagem: 'Operação realizada com sucesso',
        data: {
            ...newPartner
        }
    }
}

module.exports = {
    createNewPartner
}
