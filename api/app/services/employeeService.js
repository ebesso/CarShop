const employeeModel = require("../models/employeeModel")

const EmployeeService = {
    All: () => {
        return employeeModel.find();
    }
}

module.exports = EmployeeService