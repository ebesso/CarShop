const carModel = require("../models/carModel")
const Car = require('../models/carModel')

const CarService = {
    All: () => {
        return carModel.find();
    },
    Create: (req) => {
        const car = new Car({
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price
        })
        return car.save()
    },
    Delete: (req) => {
        return carModel.findByIdAndDelete(req.body.id);
    }
}

module.exports = CarService