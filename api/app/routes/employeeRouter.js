const express = require('express')
const employeeController = require('../controllers/employeeController')
const router = express.Router()
const withAuth = require('../middleware/withAuth')

router.get('', withAuth, employeeController.All)

module.exports = router