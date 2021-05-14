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

module.exports = {
    auth
}