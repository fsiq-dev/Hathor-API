const userService = require ('../services/user.service')

const auth = async (req, res, next) => {
    const { email, password } = req.body
    const resultService = await userService.validate(email, password)

    const resultSucsses = resultService.sucsses ? 200 : 401;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}
    return res.status (resultSucsses).send({
        message: resultService.message,
        ...resultData
    })
}
const signupUser = async (req, res, next) => {
    const { body } = req
    const resultService = await userService.createNewUser(body)

    const resultSucsses = resultService.sucsses ? 200 : 401;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}
    return res.status (resultSucsses).send({
        message: resultService.message,
        ...resultData
    })
}
const updateImage = async (req, res, next) => {
    return res.status(200).send(`ok`)
}

module.exports = {
    auth,
    signupUser,
    updateImage
}