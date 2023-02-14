const express = require('express')
const carController = require('../controllers/carController')
const router = express.Router()
const withAuth = require('../middleware/withAuth')

router.get('', withAuth, carController.All)
router.post('', withAuth, carController.Create)
router.delete('', withAuth, carController.Delete)

module.exports = router