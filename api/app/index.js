const express = require('express')
const mongoose = require('mongoose')

const config = require('../config.json')

const app = express();

const corsOptions = {
    origin: config.APP_URL,
    credentials: true
}

const cors = require('cors')
app.use(cors(corsOptions))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())

require('./models/carModel')
require('./models/employeeModel')
require('./models/userModel')
require('./models/saleModel')

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Connected to databsase'), (err) => console.log(err));

const carRouter = require('./routes/carRouter')
const salesRouter = require('./routes/salesRouter')
const employeeRouter = require('./routes/employeeRouter')
const userRouter = require('./routes/userRouter')

app.use('/carmodels', carRouter)
app.use('/total_sales', salesRouter)
app.use('/employees', employeeRouter)
app.use('/user', userRouter)


module.exports = app 