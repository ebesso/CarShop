const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale'
    }]
}, {methods: {
    getTotalSales(){
        return new Promise((resolve, reject) => {
            this.populate({
                path: 'sales',
                populate: { path: 'car' }
            }).then(() => {
                let total = 0;
                this.sales.forEach((sale) => {
                    total += sale.car.price
                })
                resolve(total)
            })

        })
    }
}})



module.exports = mongoose.model('Employee', employeeSchema);