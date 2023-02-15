const employeeModel = require("../models/employeeModel")

const SalesService = {
    Total: async () => {
        return new Promise((resolve, reject) => {
            employeeModel.find().then((employees) => {
                const res = []
                const loopPromise = new Promise(async (loopResolve, loopReject) => {
                    employees.forEach(async (employee, i) => {
                        employee.getTotalSales().then((total) => {
                            res.push({
                                name: employee.name,
                                sales: total
                            })
                            if (employees.length - 1 === i) loopResolve()

                        }).catch(() => loopReject())

                    })
        
                })

                loopPromise.then(() => resolve(res)).catch(() => reject(500))
            })
        })
    }
}

module.exports = SalesService