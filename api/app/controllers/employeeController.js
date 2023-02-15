const EmployeeService = require('../services/employeeService')

exports.All = (req, res) => {
    EmployeeService.All().then((employees) => {
        res.send(employees)
    }, (err) => {
        res.sendStatus(500)
    })
}