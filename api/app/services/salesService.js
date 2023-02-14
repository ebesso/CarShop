const employeeModel = require("../models/employeeModel")

const SalesService = {
    Total: async () => {
        const employees = await employeeModel.find()
        const res = []
        const promise = new Promise(async (resolve, reject) => {
            employees.forEach(async (employee, i) => {
                const total = await employee.getTotalSales()
                res.push({
                    name: employee.name,
                    sales: total
                })
                if (employees.length - 1 === i)resolve()
            })

        })
        await promise 
        return res
    }
}

module.exports = SalesService