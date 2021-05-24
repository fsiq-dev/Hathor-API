const { user } = require('../models/index')
const cryptograph = require('../utils/cryptograph.utils')
const userMapper = require('../mapper/user.mapper')

const emailAlreadyExist = async (email) => {
    const users = await user.find({ email })
    return users.length > 0 ? true : false
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
    validate,
    emailAlreadyExist
}