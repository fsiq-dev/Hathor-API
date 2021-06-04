const { user } = require('../models/index')
const cryptograph = require('../utils/cryptograph.utils')
const userMapper = require('../mapper/user.mapper')

const { toUserDTO } = userMapper

const emailAlreadyExist = async (email) => {
    const users = await user.find({ email })
    return users.length > 0 ? true : false
}

const createNewUser = async (model) => {
    const {name, email , password, ...rest} = model

    if(await emailAlreadyExist(email))
        return{
            sucsses: false,
            message: 'operação não pode ser realizada',
            details: [
                'Já existe usuário cadastrado para o email informado'
            ]
        }
    const newUser = await user.create({
        name,
        email,
        password: cryptograph.createHash(password),
    })
    return {
        sucsses: true,
        message: 'Operação realizada com sucesso',
        data: {
            ...toUserDTO(newUser)
        }
    }
}

const userAlreadyExist = async (email, password) => {
    return await user.findOne({ email, password: cryptograph.createHash(password) }) ? true : false
}

const createCredential = async (email) => {
    const userDB = await user.findOne({
        email,
    })
    const userDTO = userMapper.toUserDTO(userDB)
    return {
        token: cryptograph.createToken(userDTO),
        userDTO,
    }
}

const validate = async (email, password) => {
    const resultDB = await userAlreadyExist(email, password)
    if(!resultDB) {
        return {
            sucsses: false,
            message: "não foi possivel autenticar o usuario",
            details: [
                "usuário ou senha inválido",
            ],
        }
    }
    return {
        sucsses: true,
        message: "Usuário autenticado com sucesso",
        data: await createCredential(email)
    }
}

module.exports = { 
    userAlreadyExist,
    createNewUser,
    validate,
    emailAlreadyExist
}