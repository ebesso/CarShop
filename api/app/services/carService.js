const carModel = require("../models/carModel")
const Car = require('../models/carModel')

const CarService = {
    All: () => {
        return carModel.find({archived: false});
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
        return new Promise((resolve, reject) =>  {
            if(!req.body.id) reject(400)
            else{
                carModel.findById(req.body.id).then((model) => {
                    if(!model){
                        reject(404)
                    }else{
                        model.archived = true
                        model.save().then((savedModel) => resolve()).catch(() => reject(500))
                    }
                })
            }
        })
    }
}

module.exports = CarService