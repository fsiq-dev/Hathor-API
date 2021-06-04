const { employee } = require ('../models/index')
const { toDTO } = require('../mapper/employee.mapper')
const { emailAlreadyExist } = require('../services/user.service')
const cryptograph = require('../utils/cryptograph.utils')
const fileUtils = require('../utils/file.utils')

const { moveFile, removeFile } = fileUtils
const { createHash } = cryptograph

const listAllEmployeeService = async () => {
    const listAllEmployeeDB = await employee.find({})
    return listAllEmployeeDB.map(employeeDB => {
        return toDTO(employeeDB)
    })
}

const createEmployee = async (model, id) => {
    const { email, password, ...rest } = model

    if(await emailAlreadyExist(email))
        return{
            sucsses: false,
            message: 'operação não pode ser realizada',
            details: [
                'Já existe usuário cadastrado para o email informado'
            ]
        }
    const newEmployee = await employee.create({
        email,
        address: {
            country: model.address.country,
            state: model.address.state,
            city: model.address.city,
            address: model.address.address,
            zip: model.address.zip
        },
        partnersId: id,
        categoryId: model.categoryId,
        ...rest,
        password: createHash(password),
        status: true
    })
    return {
        sucsses: true,
        message: 'Operação realizada com sucesso',
        data: toDTO(newEmployee)
    }
}

module.exports = {
    listAllEmployeeService,
    createEmployee,
}