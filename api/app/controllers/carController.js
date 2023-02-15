const CarService = require("../services/carService")

exports.Create = async (req, res) => {
    CarService.Create(req).then((car) => {
        res.send(car)
    }, (err) => {
        res.status(400).send(err.message)
    })
}

exports.All = async (req, res) => {
    CarService.All().then((cars) => {
        res.send(cars)
    }, (err) => {
        res.status(500).send(err.message)
    });
}

exports.Delete = async (req, res) => {
    CarService.Delete(req).then(() => {
        res.sendStatus(200)
    }, (status) => {
        res.sendStats(status)
    });
}