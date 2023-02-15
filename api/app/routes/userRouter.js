const express = require('express')
const userController = require('../controllers/userController')
const withAdmin = require('../middleware/withAdmin')
const withAuth = require('../middleware/withAuth')
const router = express.Router()

router.post('/', withAdmin, userController.register)
router.post('/authenticate', userController.authenticate)
router.post('/logout', withAuth, userController.logout)
router.post('/reset', userController.resetPassword)

router.patch('/', withAdmin, userController.update)

router.delete('/', withAdmin, userController.delete)

router.get('/', withAuth, userController.all)
router.get('/verify', withAuth, userController.verify)
router.get('/admin', withAdmin, userController.admin)
router.get('/profile', withAuth, userController.profile)

module.exports = router