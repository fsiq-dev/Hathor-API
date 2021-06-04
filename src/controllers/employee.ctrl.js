const employeeService = require('../services/employee.service')

const { listAllEmployeeService, createEmployee, createEventCalendarByEmployee } = employeeService

const listAllEmployee = async (req, res, next) => {
    const resultService = await listAllEmployeeService()
    return res.status(200).send({ data: resultService })
}

const createNewEmployee = async(req, res, next) => {
    const { body, params } = req
    const resultService = await createEmployee(body, params.id)

    const resultSucsses = resultService.sucsses ? 200 : 401;
    const resultData = resultService.sucsses ? {data: resultService.data} : {datails: resultService.details}
    return res.status (resultSucsses).send({
        message: resultService.message,
        ...resultData
    })
}

const createEventByEmployee = async (req, res, next) => {
    const { body } = req
    const { id } = req.params

    const resultService = await createEventCalendarByEmployee(id,body)
}

module.exports = {
    listAllEmployee,
    createNewEmployee,
    createEventByEmployee
}