const express = require('express')
const salesController = require('../controllers/salesController')
const router = express.Router()
const withAuth = require('../middleware/withAuth')

router.get('', withAuth, salesController.Total)

module.exports = router