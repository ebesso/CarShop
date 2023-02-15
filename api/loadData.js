const mongoose = require('mongoose')

const Car = require('./app/models/carModel')
const Sale = require('./app/models/saleModel')
const Employee = require('./app/models/employeeModel')

const data = require('./data/data.json')

mongoose.connect(process.env.DATABASE_URL).then(async () => {
    console.log('Connected to database')

    const {employees, carmodels, sales} = data.carshop

    const addedCars = []
    const addedEmployees = []

    const carPromise = new Promise((resolve, reject) => {
        carmodels.forEach(async (car) => {
            let model = new Car({
                brand: car.brand,
                model: car.model,
                price: car.price
            })

            model.save().then((addedModel) => {
                addedCars.push(addedModel)
                if (addedCars.length === carmodels.length) resolve()
            })

        })
    })


    const employeePromise = new Promise((resolve, reject) => {
        employees.forEach(async (employee) => {
            let model = new Employee({
                name: employee.name,
            })
    
            await model.save()
    
            addedEmployees.push(model)

            if (addedEmployees.length === employees.length) resolve()
        })
    })

    await Promise.all([carPromise, employeePromise])

    const salesPromise = new Promise((resolve, reject) => {
        sales.forEach(async (sale, i) => {
            const employee = employees[sale.employee_id - 1]
            const car = carmodels[sale.carmodel_id - 1]

            const addedEmployee = await Employee.findOne({name: employee.name})
            const addedCar = await Car.findOne({model: car.model, brand: car.brand})

            let newSale = new Sale({
                employee: addedEmployee._id,
                car: addedCar._id
            })
    
            newSale.save().then((addedSale) => {
                addedEmployee.sales.push(addedSale)
                addedEmployee.save().then(() => {
                    if (i === sales.length - 1)resolve()
                })
            });
        })
    })
    salesPromise.then(() => {
        console.log('Done')
        mongoose.disconnect()
    })
    // salesPromise.then(() => {
    //     new Promise((resolve, reject) => {
    //         addedEmployees.forEach(async (employee, i) => {
    //             await employee.save()
    //             if (i === addedEmployees.length - 1)resolve() 
    //         })
    //     }).then(() => {
    //         console.log('Done')
    //         mongoose.disconnect();
    //     })
    // })
}, (err) => console.log('Failed to connect to database'));
