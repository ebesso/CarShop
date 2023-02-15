const SalesService = require('../services/salesService')

exports.Total = (req, res) => {
    SalesService.Total().then((total) => {
        res.send(total)
    }).catch((status) => {
        res.sendStatus(status)
    })
}